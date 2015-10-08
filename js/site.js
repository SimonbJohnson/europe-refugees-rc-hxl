//function to construct hxlprxy URL

function constructHXLURL(linkList){
    var url = 'http://beta.proxy.hxlstandard.org/data.csv?filter_count=7&url=';
    linkList.forEach(function(l,i){
        if(i==0){
            url+=l+'&format=html';
        }
        if(i==1){
            url+='&filter01=append&append-dataset01-01='+l;
        }
        if(i>1 && 1<10){
            url+='&append-dataset01-0'+i+'='+l;
        }
        if(i>1 && 1<10){
            url+='&append-dataset01-'+i+'='+l;
        }        
    });
    url += '&filter02=replace-map&replace-map-url02=https://docs.google.com/spreadsheets/d/12TdWAO9BmavBkGEM-7hPV7IMjN_EOJY_2iGnW_ezjuk/pub?gid=493036357&single=true&output=csv7&filter03=merge&merge-url03=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F12TdWAO9BmavBkGEM-7hPV7IMjN_EOJY_2iGnW_ezjuk%2Fpub%3Foutput%3Dcsv&merge-tags03=country%2Bcode&merge-keys03=country-code';
    return url;
}

var url = constructHXLURL(sheets);

var html = 'Download complete data set: <a href="'+url+'" target="_blank">Download CSV</a>';

$('#completedownload').html(html);

var hxlProxyURL = url.replace('/data.csv?','/data/edit?');

var html = 'HXL Proxy Editor: <a href="'+hxlProxyURL+'" target="_blank">Editor</a>';

$('#hxlproxyeditor').html(html);

var html = '<a href="http://simonbjohnson.github.io/data-quality-dashboard/index.html?url='+encodeURIComponent('http://beta.proxy.hxlstandard.org/data/uwAZzW.csv')+'" target="_blank">Data quality dashboard</a>';

$('#dataquality').html(html);

$('#updatedownloadbutton').click(function(){
    $('#updatedownload').html('Updating CSV');
    $.ajax(url+'&force=1', {
            success: function(data) {
                $('#updatedownload').html('Updating Dashboard');
                var newURL = url.replace('/data.csv?','/data.json?');
                $.ajax(newURL+'&force=1', {
                    success: function(data) {
                        $('#updatedownload').html('Update complete');
                    },
                    error: function(e,err) {
                        $('#updatedownload').html('Bad Update');
                    }
                });   
            },
            error: function(e,err) {
                $('#updatedownload').html('Bad Update');
            }
    });    
});
