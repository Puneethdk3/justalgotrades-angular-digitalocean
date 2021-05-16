//var backendUrl = "http://localhost:4300";
var backendUrl = "https://pro.justalgotrades.com";
function reloadPage()
{
    // Get the current page
    var curr_page = window.location.href,
    next_page = "";

    // If current page has a query string, append action to the end of the query string, else
    // create our query string
    if(curr_page.includes("?")) {
        next_page = curr_page.split("?")[0]+"?initCapital="+$('#customRange').val()+"&leverage="+$("#leverage").val()+"&profitType="+$("#profitType").val();
    } else {
        next_page = curr_page.split("?")[0]+"?initCapital="+$('#customRange').val()+"&leverage="+$("#leverage").val()+"&profitType="+$("#profitType").val();
    }

    // Redirect to next page
    window.location = next_page;
}
function init(capitalChanged)
{   
    var elem = document.getElementById("strategy-performance");
    elem.style.display = 'none';
    var defaultLeverage = 8; 
    var maxCapital = 100000;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    
    const spinner = document.getElementById("spinner");
    
    spinner.removeAttribute('hidden');
    var res = {};
    var dataFull = 0;
    var data_2015= [];
    var data_2016= [];
    var data_2017= [];
    var data_2018= [];
    var data_2019= [];
    var data_2020= [];
    var data_2021= [];

    var initCapital = urlParams.get('initCapital') ?  parseFloat(urlParams.get('initCapital')) : 100000;
    var profitType = urlParams.get('profitType') ?  urlParams.get('profitType') : "noncumulative";
    var startYear = urlParams.get('startYear') ?  urlParams.get('startYear') : 2015;
    var leverage = urlParams.get('leverage') ? parseInt(urlParams.get('leverage')) : defaultLeverage;
    if(!leverage) leverage = defaultLeverage;

    $("#leverage").val(leverage);
    $("#startYear").val(startYear);
    $("#profitType").val(profitType);

    document.getElementById("customRange").defaultValue=initCapital; $valueSpan = $('.valueSpan'); $valueSpan.html(initCapital);

    var profitPercYearly = [];
    fetch(backendUrl+'/api/daily-performance?startYear='+startYear)
        .then(response => response.json())
        .then(data => {
            spinner.setAttribute('hidden', '');
            elem.style.display = 'block';
            res = data;
            if(capitalChanged){
                initCapital = parseFloat(capitalChanged);
            }
            
            var index=0;
            for(var r in res) {
                index++;
                if(index==1){
                    cumCapital = initCapital*leverage;
                }
                else{
                    if(profitType=='cumulative'){
                        cumCapital = parseFloat(dataFull);
                    }else{
                        cumCapital = initCapital*leverage;
                    }
                } 
                
                performanceObj = res[r];
                performanceObjNextDay = res[parseInt(r)+1];
                if(performanceObj.TradeDate.toString().includes("2015"))
                {
                    data_2015.push({
                        count: parseInt(performanceObj.Profit).toFixed(2),
                        date: performanceObj.TradeDate
                    });
                    data_2015[data_2015.length-1].profitGot = parseInt(parseFloat(data_2015[data_2015.length-1].count)/100*parseFloat(cumCapital)/100 + cumCapital);
                    data_2015[data_2015.length-1].daysProfit = parseInt(parseFloat(data_2015[data_2015.length-1].count)/100*parseFloat(cumCapital)/100);
                    if(profitType=='noncumulative')
                        dataFull += data_2015[data_2015.length-1].profitGot - cumCapital;
                    else dataFull = data_2015[data_2015.length-1].profitGot;
                }
                if(performanceObj.TradeDate.toString().includes("2015") && performanceObjNextDay.TradeDate.toString().includes("2016"))
                {
                    lastYearProfit = (profitType=='cumulative') ? dataFull : dataFull + initCapital;
                    document.getElementById("customRange1").defaultValue=lastYearProfit;
                    $valueSpan = $('.valueSpan1'); $valueSpan.html(lastYearProfit);
                    yearlyProfitPerc = Math.ceil(parseFloat(lastYearProfit-initCapital)*100/initCapital).toFixed(0) +"%";
                    $profitPercSpan = $('.profitPerc1'); $profitPercSpan.html(yearlyProfitPerc);
                    profitPercYearly.push(lastYearProfit);
                }
                if(performanceObj.TradeDate.toString().includes("2016"))
                {   
                    data_2016.push({
                        count: parseInt(performanceObj.Profit).toFixed(2),
                        date: performanceObj.TradeDate
                    });
                    data_2016[data_2016.length-1].profitGot = parseInt(parseFloat(data_2016[data_2016.length-1].count)/100*parseFloat(cumCapital)/100 + cumCapital);
                    data_2016[data_2016.length-1].daysProfit = parseInt(parseFloat(data_2016[data_2016.length-1].count)/100*parseFloat(cumCapital)/100);
                    if(profitType=='noncumulative')
                        dataFull += data_2016[data_2016.length-1].profitGot - cumCapital;
                    else dataFull = data_2016[data_2016.length-1].profitGot;
                }
                if(performanceObj.TradeDate.toString().includes("2016") && performanceObjNextDay.TradeDate.toString().includes("2017"))
                {
                    lastYearProfit = (profitType=='cumulative') ? dataFull : dataFull + initCapital;
                    document.getElementById("customRange2").defaultValue=lastYearProfit;
                    $valueSpan = $('.valueSpan2'); $valueSpan.html(lastYearProfit);
                    
                    yearlyProfitPerc = Math.ceil(parseFloat(lastYearProfit-profitPercYearly[profitPercYearly.length-1])*100/initCapital).toFixed(0) +"%";
                    $profitPercSpan = $('.profitPerc2'); $profitPercSpan.html(yearlyProfitPerc);
                    profitPercYearly.push(lastYearProfit);
                }
                if(performanceObj.TradeDate.toString().includes("2017"))
                {
                    data_2017.push({
                        count: parseInt(performanceObj.Profit).toFixed(2),
                        date: performanceObj.TradeDate
                    });
                    data_2017[data_2017.length-1].profitGot = parseInt(parseFloat(data_2017[data_2017.length-1].count)/100*parseFloat(cumCapital)/100 + cumCapital);
                    data_2017[data_2017.length-1].daysProfit = parseInt(parseFloat(data_2017[data_2017.length-1].count)/100*parseFloat(cumCapital)/100);
                    if(profitType=='noncumulative')
                        dataFull += data_2017[data_2017.length-1].profitGot - cumCapital;
                    else dataFull = data_2017[data_2017.length-1].profitGot;
                }
                if(performanceObj.TradeDate.toString().includes("2017") && performanceObjNextDay.TradeDate.toString().includes("2018"))
                {
                    lastYearProfit = (profitType=='cumulative') ? dataFull : dataFull + initCapital;
                    document.getElementById("customRange3").defaultValue=lastYearProfit;
                    $valueSpan = $('.valueSpan3'); $valueSpan.html(lastYearProfit);

                    yearlyProfitPerc = Math.ceil(parseFloat(lastYearProfit-profitPercYearly[profitPercYearly.length-1])*100/initCapital).toFixed(0) +"%";
                    $profitPercSpan = $('.profitPerc3'); $profitPercSpan.html(yearlyProfitPerc);
                    profitPercYearly.push(lastYearProfit);
                }
                if(performanceObj.TradeDate.toString().includes("2018"))
                {
                    data_2018.push({
                        count: parseInt(performanceObj.Profit).toFixed(2),
                        date: performanceObj.TradeDate
                    });
                    data_2018[data_2018.length-1].profitGot = parseInt(parseFloat(data_2018[data_2018.length-1].count)/100*parseFloat(cumCapital)/100 + cumCapital);
                    data_2018[data_2018.length-1].daysProfit = parseInt(parseFloat(data_2018[data_2018.length-1].count)/100*parseFloat(cumCapital)/100);
                    if(profitType=='noncumulative')
                        dataFull += data_2018[data_2018.length-1].profitGot - cumCapital;
                    else dataFull = data_2018[data_2018.length-1].profitGot;
                }
                if(performanceObj.TradeDate.toString().includes("2018") && performanceObjNextDay.TradeDate.toString().includes("2019"))
                {
                    lastYearProfit = (profitType=='cumulative') ? dataFull : dataFull + initCapital;
                    document.getElementById("customRange4").defaultValue=lastYearProfit;
                    $valueSpan = $('.valueSpan4'); $valueSpan.html(lastYearProfit);
                    
                    yearlyProfitPerc = Math.ceil(parseFloat(lastYearProfit-profitPercYearly[profitPercYearly.length-1])*100/initCapital).toFixed(0) +"%";
                    $profitPercSpan = $('.profitPerc4'); $profitPercSpan.html(yearlyProfitPerc);
                    profitPercYearly.push(lastYearProfit);
                }
                if(performanceObj.TradeDate.toString().includes("2019"))
                {
                    data_2019.push({
                        count: parseInt(performanceObj.Profit).toFixed(2),
                        date: performanceObj.TradeDate
                    });
                    data_2019[data_2019.length-1].profitGot = parseInt(parseFloat(data_2019[data_2019.length-1].count)/100*parseFloat(cumCapital)/100 + cumCapital);
                    data_2019[data_2019.length-1].daysProfit = parseInt(parseFloat(data_2019[data_2019.length-1].count)/100*parseFloat(cumCapital)/100);
                    if(profitType=='noncumulative')
                        dataFull += data_2019[data_2019.length-1].profitGot - cumCapital;
                    else dataFull = data_2019[data_2019.length-1].profitGot;
                }
                if(performanceObj.TradeDate.toString().includes("2019") && performanceObjNextDay.TradeDate.toString().includes("2020"))
                {
                    lastYearProfit = (profitType=='cumulative') ? dataFull : dataFull + initCapital;
                    document.getElementById("customRange5").defaultValue=lastYearProfit;
                    $valueSpan = $('.valueSpan5'); $valueSpan.html(lastYearProfit);
                    
                    yearlyProfitPerc = Math.ceil(parseFloat(lastYearProfit-profitPercYearly[profitPercYearly.length-1])*100/initCapital).toFixed(0) +"%";
                    $profitPercSpan = $('.profitPerc5'); $profitPercSpan.html(yearlyProfitPerc);
                    profitPercYearly.push(lastYearProfit);
                }
                if(performanceObj.TradeDate.toString().includes("2020") )
                {
                    data_2020.push({
                        count: parseInt(performanceObj.Profit).toFixed(2),
                        date: performanceObj.TradeDate
                    });
                    data_2020[data_2020.length-1].profitGot = parseInt(parseFloat(data_2020[data_2020.length-1].count)/100*parseFloat(cumCapital)/100 + cumCapital);
                    data_2020[data_2020.length-1].daysProfit = parseInt(parseFloat(data_2020[data_2020.length-1].count)/100*parseFloat(cumCapital)/100);
                    if(profitType=='noncumulative')
                        dataFull += data_2020[data_2020.length-1].profitGot - cumCapital;
                    else dataFull = data_2020[data_2020.length-1].profitGot;
                }

                if(performanceObj.TradeDate.toString().includes("2020") && performanceObjNextDay.TradeDate.toString().includes("2021"))
                {
                    lastYearProfit = (profitType=='cumulative') ? dataFull : dataFull + initCapital;
                    document.getElementById("customRange6").defaultValue=lastYearProfit;
                    $valueSpan = $('.valueSpan6'); $valueSpan.html(lastYearProfit);
                    
                    yearlyProfitPerc = Math.ceil(parseFloat(lastYearProfit-profitPercYearly[profitPercYearly.length-1])*100/initCapital).toFixed(0) +"%";
                    $profitPercSpan = $('.profitPerc6'); $profitPercSpan.html(yearlyProfitPerc);
                    profitPercYearly.push(lastYearProfit);
                }
                if(performanceObj.TradeDate.toString().includes("2021"))
                {
                    data_2021.push({
                        count: parseInt(performanceObj.Profit).toFixed(2),
                        date: performanceObj.TradeDate
                    });
                    data_2021[data_2021.length-1].profitGot = parseInt(parseFloat(data_2021[data_2021.length-1].count)/100*parseFloat(cumCapital)/100 + cumCapital);
                    data_2021[data_2021.length-1].daysProfit = parseInt(parseFloat(data_2021[data_2021.length-1].count)/100*parseFloat(cumCapital)/100);
                    if(profitType=='noncumulative')
                        dataFull += data_2021[data_2021.length-1].profitGot - cumCapital;
                    else dataFull = data_2021[data_2021.length-1].profitGot;
 
                }
                 if(index == res.length-1){
                    lastYearProfit = (profitType=='cumulative') ? dataFull : dataFull + initCapital;
                    document.getElementById("customRange7").defaultValue=lastYearProfit;
                    $valueSpan = $('.valueSpan7'); $valueSpan.html(lastYearProfit);

                    yearlyProfitPerc = Math.ceil(parseFloat(lastYearProfit-profitPercYearly[profitPercYearly.length-1])*100/initCapital).toFixed(0) +"%";
                    $profitPercSpan = $('.profitPerc7'); $profitPercSpan.html(yearlyProfitPerc);
                    profitPercYearly.push(lastYearProfit);
                } 
            }
            
            $("#heatmap-7").CalendarHeatmap( data_2021, {
                title: "2021",
                coloring: "red", 
                tiles: {
                    shape: "circle"
                },
                labels: {
                    days: true,
                    custom: {
                        monthLabels: "MMM 'YY"
                    }
                },
                tooltips:{
                    show: true
                }
            });

            $("#heatmap-6").CalendarHeatmap( data_2020, {
                title: "2020",
                coloring: "red", 
                tiles: {
                    shape: "circle"
                },
                labels: {
                    days: true,
                    custom: {
                        monthLabels: "MMM 'YY"
                    }
                },
                tooltips:{
                    show: true
                }
            });

            $("#heatmap-5").CalendarHeatmap( data_2019, {
                title: "2019",
                coloring: "red", 
                tiles: {
                    shape: "circle"
                },
                labels: {
                    days: true,
                    custom: {
                        monthLabels: "MMM 'YY"
                    }
                },
                tooltips:{
                    show: true
                }
            });

            $("#heatmap-4").CalendarHeatmap( data_2018, {
                title: "2018",
                coloring: "red", 
                tiles: {
                    shape: "circle"
                },
                labels: {
                    days: true,
                    custom: {
                        monthLabels: "MMM 'YY"
                    }
                },
                tooltips:{
                    show: true
                }
            });

            $("#heatmap-3").CalendarHeatmap( data_2017, {
                title: "2017",
                coloring: "red", 
                tiles: {
                    shape: "circle"
                },
                labels: {
                    days: true,
                    custom: {
                        monthLabels: "MMM 'YY"
                    }
                },
                tooltips:{
                    show: true
                }
            });

            $("#heatmap-2").CalendarHeatmap( data_2016, {
                title: "2016",
                coloring: "red", 
                tiles: {
                    shape: "circle"
                },
                labels: {
                    days: true,
                    custom: {
                        monthLabels: "MMM 'YY"
                    }
                },
                tooltips:{
                    show: true
                }
            });

            $("#heatmap-1").CalendarHeatmap( data_2015, {
                title: "2015",
                coloring: "red", 
                tiles: {
                    shape: "circle"
                },
                labels: {
                    days: true,
                    custom: {
                        monthLabels: "MMM 'YY"
                    }
                },
                tooltips:{
                    show: true
                }
            });
        });
}

$(document).ready(function() {const $valueSpan = $('.valueSpan');const $value = $('#customRange');$valueSpan.html($value.val());
$value.on('input change', () => {
    $valueSpan.html($value.val());
});
});

$(document).ready(function() {const $valueSpan = $('.valueSpan1');const $value = $('#customRange1');$valueSpan.html($value.val());
$value.on('input change', () => {
    $valueSpan.html($value.val());
});
});
$(document).ready(function() {const $valueSpan = $('.valueSpan2');const $value = $('#customRange2');$valueSpan.html($value.val());$value.on('input change', () => {
    $valueSpan.html($value.val());
});
});
$(document).ready(function() {const $valueSpan = $('.valueSpan3');const $value = $('#customRange3');$valueSpan.html($value.val());$value.on('input change', () => {
    $valueSpan.html($value.val());
});
});
$(document).ready(function() {const $valueSpan = $('.valueSpan4');const $value = $('#customRange4');$valueSpan.html($value.val());$value.on('input change', () => {
    $valueSpan.html($value.val());
});
});
$(document).ready(function() {const $valueSpan = $('.valueSpan5');const $value = $('#customRange5');$valueSpan.html($value.val());$value.on('input change', () => {
    $valueSpan.html($value.val());
});
});
$(document).ready(function() {const $valueSpan = $('.valueSpan6');const $value = $('#customRange6');$valueSpan.html($value.val());$value.on('input change', () => {
    $valueSpan.html($value.val());
});
});
$(document).ready(function() {const $valueSpan = $('.valueSpan7');const $value = $('#customRange7');$valueSpan.html($value.val());$value.on('input change', () => {
    $valueSpan.html($value.val());
});
});