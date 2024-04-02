document.addEventListener("DOMContentLoaded", function (arg) {
    google.charts.load("current", { packages: ["corechart"] });

    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn("string", "Topping");
        data.addColumn("number", "Slices");
        data.addRows([
            ["Mushrooms", 3],
            ["Onions", 1],
            ["Olives", 1],
            ["Zucchini", 1],
            ["Pepperoni", 2],
        ]);

        // Set chart options
        var options = {
            title: "How Much Pizza I Ate Last Night",
            width: 400,
            height: 300,
        };

        var chart = new google.visualization.PieChart(
            document.getElementById("chart_div")
        );
        chart.draw(data, options);
    }
    const error = "Error";
    console.log("TEST");


});
