

//EDIT THESE LINES
//Title of the blog
var TITLE = "Trabajos en Valdivia";
//RSS url
var RSS = "http://feeds.feedburner.com/feedburner/kwPX";
//Stores entries
var entries = [];
var selectedEntry = "";

//listen for detail links
$(".contentLink").live("click", function() {
	selectedEntry = $(this).data("entryid");
});

function renderEntries(entries) {
    var s = '';
    $.each(entries, function(i, v) {
        s += '<li><a href="#contentPage" class="contentLink" data-entryid="'+i+'">' + v.title + '</a></li>';
    });
    $("#linksList").html(s);
    $("#linksList").listview("refresh");		
}

//Listen for main page
$("#mainPage").live("pageinit", function() {
	//Set the title
	$("h1", this).text(TITLE);
	
	$.ajax({
		url:RSS,
		success:function(res,code) {
			entries = [];
			var xml = $(res);
			var items = xml.find("item");
			$.each(items, function(i, v) {
				entry = { 
					title:$(v).find("title").text(), 
					link:$(v).find("link").text(), 
					description:$.trim($(v).find("description").text())
				};
				entries.push(entry);
			});
			//store entries
			localStorage["entries"] = JSON.stringify(entries);
			renderEntries(entries);
		},
		error:function(jqXHR,status,error) {
			//try to use cache
			if(localStorage["entries"]) {
				$("#status").html("Estas sin internet, los avisos podrian no estar actualizados.");
				entries = JSON.parse(localStorage["entries"])
				renderEntries(entries);				
			} else {
				$("#status").html("Disculpa, para cargar la aplicacion por primera vez necesitas estar conectado.");
			}
		}
	});
	
});

$("#mainPage").live("pagebeforeshow", function(event,data) {
	if(data.prevPage.length) {
		$("h1", data.prevPage).text("");
		$("#entryText", data.prevPage).html("");
	};
});

//Listen for the content page to load
$("#contentPage").live("pageshow", function(prepage) {
	//Set the title
	$("h1", this).text(entries[selectedEntry].title);
	var contentHTML = "";
	contentHTML += entries[selectedEntry].description;
	contentHTML += '<p/><a href="'+entries[selectedEntry].link + '" data-role="button" data-theme="b"><font size="8" color="#fff">Ver Aviso</font></a>';
	$("#entryText",this).html(contentHTML);
});
	
