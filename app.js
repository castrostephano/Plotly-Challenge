
function buildBar(selectedID) {

  d3.json("samples.json").then((data) => {

    var sampledata = data.samples

    var filteredData = sampledata.filter(subjects => subjects.id == selectedID)[0];

    var trace1 = {
      x: filteredData.sample_values.slice(0, 10).reverse(),
      y: filteredData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      type: "bar",
      orientation: 'h'
    };

    var data = [trace1];

    var layout = {
      title: "",
      xaxis: { title: "" },
      yaxis: { title: "" }
    };

    Plotly.newPlot("bar", data, layout);

  })
}

function BuildDropDown() {
  // //build dropdown
  d3.json("samples.json").then((data) => {

    // add them to the dropdown
    var selection = d3.select("#selDataset")
    data.names.forEach(function (name) {
      selection.append("option")
        .text(name)
        .attr("value", name)
    })

  })
}


buildBar(940)
BuildDropDown()
buildBubble(940)
buildDemo(940)

function buildBubble(selectedID) {

  d3.json("samples.json").then((data) => {


    var sampledata = data.samples

    var filteredData = sampledata.filter(subjects => subjects.id == selectedID)[0];

    console.log(filteredData)

    var trace1 = {
      x: filteredData.otu_ids,
      y: filteredData.sample_values,
      mode: 'markers',
      marker: {
        color: filteredData.sample_values, 
        opacity: .6,
        size: filteredData.sample_values,
      }
    };

    var data = [trace1];

    var layout = {
      title: 'Marker Size and Color',
      showlegend: false,
      height: 600,
      width: 1200,
    };

    Plotly.newPlot('bubble', data, layout);

  })
}


//similar to drop down, sel area of html, adding things to it. 
//not options bcs its a dropdown tag, some type of text
//Display the sample metadata, i.e., an individual's demographic information.
//Display each key-value pair from the metadata JSON object somewhere on the page.

function buildDemo() {

  d3.json("samples.json").then((data) => {

    var sampledata = data.metadata

    var filteredData = sampledata.filter(subjects => subjects.id == id);
    var filteredDataSingle = filteredData[0];

    // add them to the dropdown
    var selection = d3.select("#sample-metadata")
      Object.entries(filteredData).forEach(([key, value]) => {
      selection.append("h5").text(`${key.toUpperCase()}: ${value}`);
    });

    //   data.metadata.forEach(function (filteredData) {
    //   selection.append(key, value)
    //     .text(name)
    //     .attr("value", name)
    // })

  })
}




// there is an event listener in the html
// when the event listener is triggers, it will run "optionChanged"
//this is telling the code what to do when a change is made, run the bar
function optionChanged(selectedID) {
  buildBar(selectedID)
  buildBubble(selectedID)
  buildDemo(selectedID)
  // put any of the code that needs to run after new selection
}


