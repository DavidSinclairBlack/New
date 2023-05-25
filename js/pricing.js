jQuery(document).ready(function($) {

	function animateFunnel() {
		var funnelElements = $('.calculator-area-rightblock .data-row');
		var i=0;
		var step = 1;
	
		$(funnelElements).each(function() {
			setTimeout(() => {
				$(this).addClass("highLightFunnelCell");
				setTimeout(() => {
					$(this).removeClass("highLightFunnelCell");
				}, 500);  
			}, i*100);  
			
			i += step;
		});
	}

	function pricePerProspectFunction(prospectsEngaged) {

        var initialProspectPrice = $("#tickmarks span").eq(0).data('prospectprice');

        if (prospectsEngaged < 9000) {
        costPerProspect = initialProspectPrice;

        } else if (8999 < prospectsEngaged && prospectsEngaged < 18000) {
        costPerProspect = (initialProspectPrice - (initialProspectPrice * 0.1)).toFixed(2);

        } else if (17999 < prospectsEngaged && prospectsEngaged < 24000) {
        costPerProspect = (initialProspectPrice - (initialProspectPrice * 0.15)).toFixed(2);

        } else if (prospectsEngaged > 23999) {
        costPerProspect = (initialProspectPrice - (initialProspectPrice * 0.20)).toFixed(2);
        }
        return costPerProspect;
    }

	var $rangeInput = $('#closeRates');
	
	var sliderCustomSteps = [3000, 6000, 9000, 12000, 15000, 18000, 21000, 24000, 24001],
		coefficientOpen = $("#open-average").val(),
		coefficientResponse = $("#responses").val(),
		averageLeadRate = $("#average-lead").val(),
		costPerProspect,
		prospectingVolume,
		numberOfLeads,
		totalCosts,
		costPerLead;

	$rangeInput.slider({
		range: "min",
		value: 0,
		min: 0,
		max: sliderCustomSteps.length-1,
		create: function( event, ui ) {

			if($(window).width() > 768) {
				$(".ui-slider-handle" ).attr('data-toggle', 'tooltip');
				$(".ui-slider-handle" ).attr('data-placement', 'top');
				$(".ui-slider-handle" ).attr('title', sliderCustomSteps[0]+ ' Prospects per month').tooltip();				
			}

			if($(window).width() < 768) {
				$("#tickmarks span").html('.');
				$("#tickmarks span").eq(0).html(sliderCustomSteps[0]);
			}

			$( window ).resize(function() {
				if($(window).width() > 768) {
					$(".ui-slider-handle" ).attr('data-toggle', 'tooltip');
					$(".ui-slider-handle" ).attr('data-placement', 'top');
					$(".ui-slider-handle" ).attr('title', sliderCustomSteps[0]+ ' Prospects per month').tooltip();				
				}
	
				if($(window).width() < 768) {
					$("#tickmarks span").html('.');
					$("#tickmarks span").eq(0).html(sliderCustomSteps[0]);
				}
				});

			

			costPerProspect = $("#tickmarks span").eq(0).data('prospectprice');			
			prospectingVolume = sliderCustomSteps[0];
			prospectsOpened = parseInt(Math.round(prospectingVolume * coefficientOpen));
			prospectsResponse = parseInt(Math.round(prospectingVolume * coefficientResponse));
			numberOfLeads = Math.round(prospectingVolume * averageLeadRate);
			// totalCosts = prospectingVolume * costPerProspect;
			totalCosts = prospectingVolume;
			costPerLead = totalCosts / numberOfLeads;

			$("#prospectsEngaged").html(prospectingVolume); // Prospects
			$("#prospectsOpen").html(prospectsOpened); // Open
			$("#prospectsResponse").html(prospectsResponse); // Response
			$("#prospectsLead").html(numberOfLeads);
			$("#prospectsTotal").html(totalCosts.toLocaleString('en-GB', { minimumFractionDigits: 2 }));
			$("#costPerLead").html(Number(costPerLead.toFixed(2)).toLocaleString('en-GB', { minimumFractionDigits: 2 }));

		},
		slide: function( event, ui ) {
			prospectingVolume = sliderCustomSteps[ui.value];
			costPerProspect = pricePerProspectFunction(prospectingVolume);
			prospectsOpened = parseInt(Math.round(prospectingVolume * coefficientOpen));
			prospectsResponse = parseInt(Math.round(prospectingVolume * coefficientResponse));
			numberOfLeads = Math.round(prospectingVolume * averageLeadRate);
			// totalCosts = prospectingVolume * costPerProspect;
			totalCosts = prospectingVolume;
			costPerLead = totalCosts / numberOfLeads;

			animateFunnel();
			
			if(ui.value == 8) {
				$("#tickmarks span").eq(ui.value).html('24000+');
				var site = ["prospectsEngaged","prospectsOpen","prospectsResponse","prospectsLead", "prospectsTotal", "costPerLead"];
				jQuery.each( site, function( i, val ) {
					$("#" + val ).html("-");
				});
				$(".moreThan3k").css('display','block');
				$(".lessThan3k").css('display','none');
			} else {
				$("#tickmarks span").eq(ui.value).html(sliderCustomSteps[ui.value]);
				$("#prospectsEngaged").html(prospectingVolume); // Prospects
				$("#prospectsOpen").html(prospectsOpened); // Open
				$("#prospectsResponse").html(prospectsResponse); // Response
				$("#prospectsLead").html(numberOfLeads);
				$("#prospectsTotal").html(totalCosts.toLocaleString('en-GB', { minimumFractionDigits: 2 }));
				$("#costPerLead").html(Number(costPerLead.toFixed(2)).toLocaleString('en-GB', { minimumFractionDigits: 2 }));
				$(".moreThan3k").css('display','none');
				$(".lessThank3k").css('display','none');
				$(".lessThan3k").css('display','block'); 
			}
			
			$("#tickmarks span").removeClass('active');
			$("#tickmarks span").eq(ui.value).addClass('active');

			if($(window).width() > 768) {
				if(ui.value == 8) {
					$(".ui-slider-handle" ).attr('data-original-title', '24000+ Prospects per month').tooltip('show');
				} else {
					$(".ui-slider-handle" ).attr('data-original-title', sliderCustomSteps[ui.value] + ' Prospects per month').tooltip('show');
				}
			}
			if($(window).width() < 768) {
				$("#tickmarks span").html('.'); 
				
				if(ui.value == 8) {
					$("#tickmarks span").eq(ui.value).html('24000+');
				} else {
					$("#tickmarks span").eq(ui.value).html(sliderCustomSteps[ui.value]);
				}	
			}

			$( window ).resize(function() {
				if($(window).width() > 768) {
					if(ui.value == 8) {
						$(".ui-slider-handle" ).attr('data-original-title', '24000+ Prospects per month').tooltip('show');
					} else {
						$(".ui-slider-handle" ).attr('data-original-title', sliderCustomSteps[ui.value] + ' Prospects per month').tooltip('show');
					}						
				}
				if($(window).width() < 768) {
					$("#tickmarks span").html('.'); 
					if(ui.value == 8) {
						$("#tickmarks span").eq(ui.value).html('24000+');
					} else {
						$("#tickmarks span").eq(ui.value).html(sliderCustomSteps[ui.value]);
					}	
				}
			});
		}
	});	
});