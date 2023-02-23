/*global fetch*/
window.addEventListener('load', () => {
    document.getElementById('pagination').addEventListener('click', handleClick);
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    
    let genre = params.genre; 
    let q = params.q; 
    let orderby = params.orderby; 
    let ordertype = params.ordertype; 
    if(q==null){
        q='';
        
        
    }
    if(genre==null){
        genre='';
    }
    if(orderby==null){
        orderby='';
    }
    if(ordertype==null){
        ordertype='';
    }
    fetchData('fetchData?q='+ q +'&genre='+genre+'' + '&orderby=' + orderby + '&ordertype=' + ordertype);
    this.orderListeners(q, genre);
});

function fetchData(page) {
    fetch(page)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        console.log(jsonData);
        showData(jsonData);
    })
    .catch(function(error) {
        console.log(error);
    });
}

function handleClick(e) {
    if (e.target.classList.contains('pulsable')) {
        fetchData(e.target.getAttribute('data-url'));
    }
}
function orderListeners(q, genre){
    document.getElementById('idAsc').addEventListener('click', function(){
        fetchData('fetchData?q='+ q +'&genre='+genre+'' + '&orderby=c1&ordertype=t1');
    });
    document.getElementById('idDesc').addEventListener('click', function(){
        fetchData('fetchData?q='+ q +'&genre='+genre+'' + '&orderby=c1&ordertype=t2');
    });
    document.getElementById('titleAsc').addEventListener('click', function(){
        fetchData('fetchData?q='+ q +'&genre='+genre+'' + '&orderby=c2&ordertype=t1');
    });
    document.getElementById('titleDesc').addEventListener('click', function(){
        fetchData('fetchData?q='+ q +'&genre='+genre+'' + '&orderby=c2&ordertype=t2');
    });
    document.getElementById('descriptionAsc').addEventListener('click', function(){
        fetchData('fetchData?q='+ q +'&genre='+genre+'' + '&orderby=c3&ordertype=t1');
    });
    document.getElementById('descriptionDesc').addEventListener('click', function(){
        fetchData('fetchData?q='+ q +'&genre='+genre+'' + '&orderby=c3&ordertype=t2');
    });
    document.getElementById('priceAsc').addEventListener('click', function(){
        fetchData('fetchData?q='+ q +'&genre='+genre+'' + '&orderby=c4&ordertype=t1');
    });
    document.getElementById('priceDesc').addEventListener('click', function(){
        fetchData('fetchData?q='+ q +'&genre='+genre+'' + '&orderby=c4&ordertype=t2');
    });
    document.getElementById('releaseAsc').addEventListener('click', function(){
        fetchData('fetchData?q='+ q +'&genre='+genre+'' + '&orderby=c6&ordertype=t1');
    });
    document.getElementById('releaseDesc').addEventListener('click', function(){
        fetchData('fetchData?q='+ q +'&genre='+genre+'' + '&orderby=6&ordertype=t2');
    });
    document.getElementById('genreAsc').addEventListener('click', function(){
        fetchData('fetchData?q='+ q +'&genre='+genre+'' + '&orderby=c5&ordertype=t1');
    });
    document.getElementById('genreDesc').addEventListener('click', function(){
        fetchData('fetchData?q='+ q +'&genre='+genre+'' + '&orderby=c5&ordertype=t2');
    });
    document.getElementById('querySearch').addEventListener('click', function(){
        q= document.getElementById('textSearch').value;
        fetchData('fetchData?q='+ q +'&genre='+genre);
    });
    document.getElementById('genreSearch').addEventListener('change', function(){
        genre= document.getElementById('genreSearch').value;
        fetchData('fetchData?q='+ q +'&genre='+genre);
    });
    document.getElementById('clearSearch').addEventListener('click', function(){
        genre= '';
        q= '';
        fetchData('fetchData?q='+ q +'&genre='+genre);
    });
}

function showData(data) {
    
    let tbody = document.getElementById('itemAjaxBody');
    let paginationDiv = document.getElementById('pagination');
    let items = data.items.data;
    let pagination = data.items.links;
    

    let string = '';
    items.forEach(item => {
        
        string += `
            <div class="col-lg-4 col-sm-6 mb-4">
                <div class="portfolio-item">
                    <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal${item.id}">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i>
                            </div>
                        </div>
                        <img class="img-fluid"  src=" data:image/jpeg;base64,${item.file }"/>
                    </a>
                    <div class="portfolio-caption">
                        <div class="portfolio-caption-heading">${item.title}</div>
                        <div class="portfolio-caption-subheading text-muted"> ${item.genre}</div>
                        <div class="portfolio-caption-subheading text-muted">  ${item.price}€</div>
                    </div>
                </div>
            </div>
                    
                    
                    
                   <div class="portfolio-modal modal fade" id="portfolioModal${item.id}" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-bs-dismiss="modal">
                        <img src="img/close-icon.svg" alt="Close modal" /></div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="modal-body">
                                    <!-- Project details-->
                                    <h2 class="text-uppercase">${item.title}</h2>
                                    <p class="item-intro text-muted">${item.genre}</p>
                                    <img class="img-fluid"  src=" data:image/jpeg;base64, ${item.file }"/>
                                    <p>
                                    ${item.description}</p>
                                    <button class="btn btn-primary btn-xl text-uppercase"  type="button">
                                        Add To Cart
                                    </button>
                                    <ul class="list-inline">
                                        <li>
                                            <strong>Released:</strong>
                                            ${item.releasedate}
                                        </li>
                                        <li>
                                            <strong>Price:</strong>
                                            ${item.price}
                                        </li>
                                    </ul>
                                    <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                        <i class="fas fa-xmark me-1"></i>
                                        Close Item
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        ;
    });
    tbody.innerHTML = string;

    string = '';
    pagination.forEach(pag => {
        if (pag.active) {
            string += `
                <li class="page-item active" aria-current="page">
                    <span class="page-link pulsable" data-url="${pag.url}">${pag.label}</span>
                </li>
            `;
        } else if (pag.url != null) {
            string += `
                <li class="page-item">
                    <span class="btn btn-link pulsable" data-url="${pag.url}" id="${'pag' + pag.label}">${pag.label}</span>
                </li>
            `;
        } else {
            string += `
                <li class="page-item disabled">
                    <span class="page-link" aria-hidden="true">${pag.label}</span>
                </li>
            `;
        }
    });
    paginationDiv.innerHTML = string;
    string = '';
}