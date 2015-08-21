var presentations = {};

exports.setupRemotePresenter = function(app, io, config){

	presentations = config.presentations;

    // ppt controller list page
	app.get('/',function( req, res ){
		res.render('controller_list',{title:'controller list',layout: "controller_layout"})
	});

    // ppt page or controller
	app.get('/:presentationName',function( req, res ){
		var presentationName = req.params.presentationName;
		var renderData = presentations[ presentationName ];
		res.render(presentationName, renderData);
	});

	// setup remote control here
	// socket.io setup
	io.sockets.on('connection', function (socket) {

        // broadcast the ppt list which is active
        socket.emit('presentation_list', presentations);

        // listen on ppt_connect
        socket.on('request_presentation', function( data ){
            if( presentations[ data.id ] ){
                // eg. {"id":"es6","title":"ECMA6 技术分享","icoURL":"/img/es6.ico","isActive":false}
                presentations[ data.id ].isActive = true;
                console.log('sending init presentation data ' + JSON.stringify(presentations[data.id]) );
                socket.broadcast.emit('ppt_connect', presentations[data.id]);
            }
        });

        // listen ppt disconnect
        socket.on('ppt_disconnect', function(data){
           socket.broadcast.emit('ppt_disconnected',presentations[ data.id ]);
        });


        // this should be triggered from the remote controller
        socket.on('command', function(command) {
            // eg. command : { id:'es6', txt:'up' }
            console.log("receive command " + JSON.stringify(command) );
            var curPPT = presentations[ command.id ];
            if ( curPPT ){
                socket.broadcast.emit('updatedata', command);
            }
        });

        socket.on('availableRoutes', function(availableRoutes){
            // { left:true,right:true,up:true,down:false }
            socket.broadcast.emit('updateAvailableRoutes',availableRoutes);
        });
		
	});	

	
};