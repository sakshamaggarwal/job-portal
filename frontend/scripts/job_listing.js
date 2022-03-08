// Get unique values for the desired columns

// {2 : ["M", "F"], 3 : ["RnD", "Engineering", "Design"], 4 : [], 5 : []}

function getUniqueValuesFromColumn() {
  //console.log("called");
    var unique_col_values_dict = {}

    allFilters = document.querySelectorAll(".table-filter")
    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute("col-index");
        //alert(col_index)
        const rows = document.querySelectorAll("#emp-table > tbody > tr")
        //const rows=tbody.querySelectorAll(":scope > tr");
        //console.log(rows.length);
        rows.forEach((row) => {
          //console.log(row.innerHTML);
            cell_value = row.querySelector("td:nth-child("+col_index+")").innerHTML;
            //console.log(cell_value);
            // if the col index is already present in the dict
            if (col_index in unique_col_values_dict) {

                // if the cell value is already present in the array
                if (unique_col_values_dict[col_index].includes(cell_value)) {
                    // alert(cell_value + " is already present in the array : " + unique_col_values_dict[col_index])

                } else {
                    unique_col_values_dict[col_index].push(cell_value)
                    // alert("Array after adding the cell value : " + unique_col_values_dict[col_index])

                }


            } else {
                unique_col_values_dict[col_index] = new Array(cell_value)
            }
        });


    });

    for(i in unique_col_values_dict) {
        //alert("Column index : " + i + " has Unique values : \n" + unique_col_values_dict[i]);
    }

    updateSelectOptions(unique_col_values_dict)

};

// Add <option> tags to the desired columns based on the unique values

function updateSelectOptions(unique_col_values_dict) {
    allFilters = document.querySelectorAll(".table-filter")

    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute('col-index')

        unique_col_values_dict[col_index].forEach((i) => {
            filter_i.innerHTML = filter_i.innerHTML + `\n<option value="${i}">${i}</option>`
        });

    });
};


// Create filter_rows() function

// filter_value_dict {2 : Value selected, 4:value, 5: value}

function filter_rows() {
    allFilters = document.querySelectorAll(".table-filter")
    var filter_value_dict = {}

    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute('col-index')

        value = filter_i.value
        if (value != "all") {
            filter_value_dict[col_index] = value;
        }
    });

    var col_cell_value_dict = {};

    const rows = document.querySelectorAll("#emp-table tbody tr");
    rows.forEach((row) => {
        var display_row = true;

        allFilters.forEach((filter_i) => {
            col_index = filter_i.parentElement.getAttribute('col-index')
            col_cell_value_dict[col_index] = row.querySelector("td:nth-child(" + col_index+ ")").innerHTML
        })

        for (var col_i in filter_value_dict) {
            filter_value = filter_value_dict[col_i]
            row_cell_value = col_cell_value_dict[col_i]

            if (row_cell_value.indexOf(filter_value) == -1 && filter_value != "all") {
                display_row = false;
                break;
            }
        }

        if (display_row == true) {
            row.style.display = "table-row"

        } else {
            row.style.display = "none"
        }
    })
}

function reset()
{
  console.log("called");
  allFilters = document.querySelectorAll(".table-filter")
  allFilters.forEach((filter_i) => {
      //console.log(filter_i);
      option = filter_i.querySelector("option:nth-child(1)");
      //console.log(option);
      option.selected="all";
  });
  filter_rows();
}

function fetch()
{
  console.log("called");
  $.get( "http://localhost:5000/getJobListing", function( data, status ) {
    result=JSON.parse(data);
    //console.log(result.length);
    for(var i=0;i<result.length;i++)
    {
      row=document.createElement("tr");
      for(var key in result[i])
      {
        console.log(key+" "+result[i][key])
        cell=document.createElement("td");
        cell.innerHTML=result[i][key];
        row.appendChild(cell);
      }
      document.getElementsByTagName("tbody")[0].appendChild(row);
    }
    //console.log(result.length);
    getUniqueValuesFromColumn();
  });
}
