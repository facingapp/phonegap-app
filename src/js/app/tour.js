app.tour = {
	start: function()
    {
	    $('#tourbus').tourbus( {
		    debug: true,
		    autoDepart: true,
		    onLegStart: function( leg, bus ) {
			    console.log("Intro tour is on leg: " + (leg.index+1));

			    // auto-progress where required
			    if( leg.rawData.autoProgress ) {
				    var currentIndex = leg.index;
				    setTimeout(
					    function() {
						    if( bus.currentLegIndex != currentIndex ) { return; }
						    bus.next();
					    },
					    leg.rawData.autoProgress
				    );
			    }

			    // highlight where required
			    if( leg.rawData.highlight ) {
				    leg.$target.addClass('intro-tour-highlight');
				    $('.intro-tour-overlay').show();
			    }

			    // fade/slide in first leg
			    if( leg.index == 0 ) {
				    leg.$el
					    .css( { visibility: 'visible', opacity: 0, top: leg.options.top / 2 } )
					    .animate( { top: leg.options.top, opacity: 1.0 }, 500,
					    function() { leg.show(); } );
				    return false;
			    }
		    },
		    onLegEnd: function( leg ) {
			    // remove highlight when leaving this leg
			    if( leg.rawData.highlight ) {
				    leg.$target.removeClass('intro-tour-highlight');
				    $('.intro-tour-overlay').hide();
			    }
		    },
		    onDepart: function() {
			    $('.tourbus-container').fadeIn('slow');
		    },
		    onStop: function() {
			    app.tour.stop();
		    }
	    });
    },
	stop: function()
	{
		$('.tourbus-container').hide().remove();
		$('.intro-tour-highlight').removeClass('intro-tour-highlight');
		$('.intro-tour-overlay').hide();
	}
};
