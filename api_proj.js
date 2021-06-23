$(() => {


    ///////Adding Title///////////////
    const title = document.createElement('div')
    title.className = "header"
    title.textContent = "Virtual Coins"

    $('body').append(title)

    $('body').append('<div  class = "filter"></div><div  class = "modal"></div>')
    //////Adding Search Input to the titile//////////
    $(title).append(`

<input id="searchbox" type = "text" placeholder="Search Coins">
<button id="search">Search</button>

`)


    //Crating the about me link////////////

    const about = document.createElement('a')
    about.className = 'aboutLink'
    about.href = 'about.html'
    about.textContent = "About me"
    $(title).append(about)
    let marked_coins = []




    $("#search").on("click", function () {
        var value = $("#searchbox").val().toLowerCase();
        $(".filter .cards").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });


    //////////////////////////////////////

    $.get("https://api.coingecko.com/api/v3/coins/list", function (res) {


        for (let i = 2100; i < 2150; i++) {
            console.log(res[i]);



            $('.filter').append(`
    

           
    <div class = "cards" id="card${i}">
    <label class="switch">
  <input type="checkbox" id="toggle${i}" >
  <span class="slider round"></span>
    </label>
    <h2 id ="symbol${i}" > ${res[i].symbol}</h2>
    <p id="coin_name"> ${res[i].name}</p>
    <p > ${res[i].id}</p>
    <a href="#a" id="info_btn" class="btn btn-primary" rom=${res[i].id} card_id="card${i}">More Info</a>

    </div>
    
    
    
    `)

            $(document).on('click', `#toggle${i}`, function (e) {

                if($(this).attr('isNewToggle') == "true") {
                    $("#" + $(this).attr('id')).prop("checked", false)
                        console.log( $(this).attr('id'))
                        $("#" + $(this).attr('id')).prop('checked', $(this).prop("checked")) 
                        
                    
                }

                console.log(marked_coins)
                if ($(this).prop("checked") == true) {
                    if (marked_coins.length >= 5) {
                        $(this).prop('checked', false);


                        const coins = (marked_coins.map(
                            (toggleId) => {
                                const coin_name = $("#" + toggleId.replace("toggle", "symbol")).text().trim()
                                return `<h4>${coin_name}</h4>
                                <label class="switch">
                                        <input type="checkbox" id="${toggleId}" checked=true isNewToggle="true" ">
                                         <span class="slider round"></span>
                                </label>  `  
                            })
                        )

                    
                  
                        const modalHtml = `
                       
                        <div class ='opener'>
                        ${coins}
    
                        </div>
                        `
                        $(modalHtml).appendTo('body').modal();
                 

                    } else {
                        if (marked_coins.indexOf($(this).attr('id')) == -1) {
                            marked_coins.push($(this).attr('id'))
                        }
                    }

                } else {

                    marked_coins = marked_coins.filter((coinId) => coinId != $(this).attr('id'))
                }




            })

        }





    })



    ///////Coins Info///////////////////////////


    $(document).on("click", "#info_btn", function (e) {



        const coin_id = $(e.target).attr("rom")
        const card_id = $(e.target).attr("card_id")



        $("#" + card_id).append(`<div  class="loader loader${card_id}">Loading...</div>`);
        $.get(`https://api.coingecko.com/api/v3/coins/${coin_id}`, function (data) {
            $(".loader" + card_id).remove()
            $("#" + card_id).append(`

    <div class = "info_card info${card_id}" style="display:none;" >
    <button class = "exit exit${card_id}">Hide</button>
    <img id="coin_img" src =  ${data.image.small}>
    <p> ${data.market_data.current_price.ils}₪</p>
    <p> ${data.market_data.current_price.usd}$</p>
    <p> ${data.market_data.current_price.eur}Є</p>
  

    </div>
    `

            )



            console.log(data)





            $(document).on("click", ".exit" + card_id, function (e) {
                $(".info" + card_id).fadeOut("def", () => {
                    $(".info" + card_id).remove()
                })



            })
            $(".info" + card_id).fadeIn()


        })


    });




})



















