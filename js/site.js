//function to construct hxlprxy URL

function constructHXLURL(linkList){
    var url = 'https://proxy.hxlstandard.org/data.csv?filter_count=7&url=';
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

var urloverview = 'https://proxy.hxlstandard.org/data.json?filter01=replace-map&replace-map-url01=https%3A//docs.google.com/spreadsheets/d/12TdWAO9BmavBkGEM-7hPV7IMjN_EOJY_2iGnW_ezjuk/pubhtml%3Fgid%3D493036357%26single%3Dtrue&filter02=merge&merge-url02=https%3A//docs.google.com/spreadsheets/d/12TdWAO9BmavBkGEM-7hPV7IMjN_EOJY_2iGnW_ezjuk/pub%3Fgid%3D0%26single%3Dtrue%26output%3Dcsv&merge-tags02=%23country%2Bcode&merge-keys02=%23country-code&filter03=&filter04=&filter05=&filter06=&filter07=&url=https%3A//docs.google.com/spreadsheets/d/1m3XUjtbLWKEUpUKu4ic16ruDeNj7yuZG2_1Y8U-tvs0/pub%3Fgid%3D0%26single%3Dtrue%26output%3Dcsv';

var html = 'Download complete data set: <a href="'+urloverview+'" target="_blank">Download CSV</a>';

$('#completedownloadoverview').html(html);

var hxlProxyURL = urloverview.replace('/data.csv?','/data/edit?');

var html = 'HXL Proxy Editor: <a href="'+hxlProxyURL+'" target="_blank">Editor</a>';

$('#hxlproxyeditoroverview').html(html);

var html = '<a href="http://simonbjohnson.github.io/data-quality-dashboard/index.html?url='+encodeURIComponent('https://proxy.hxlstandard.org/data/uwAZzW.csv')+'" target="_blank">Data quality dashboard</a>';

$('#dataqualityoverview').html(html);

$('#updatedownloadbuttonoverview').click(function(){
    $('#updatedownloadoverview').html('Updating CSV');
    $.ajax(url+'&force=1', {
            success: function(data) {
                $('#updatedownloadoverview').html('Updating Dashboard');
                var newURL = urloverview.replace('/data.csv?','/data.json?');
                $.ajax(newURL+'&force=1', {
                    success: function(data) {
                        $('#updatedownloadoverview').html('Update complete');
                    },
                    error: function(e,err) {
                        $('#updatedownloadoverview').html('Bad Update');
                    }
                });   
            },
            error: function(e,err) {
                $('#updatedownloadoverview').html('Bad Update');
            }
    });    
});
