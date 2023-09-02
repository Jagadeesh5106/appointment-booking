var crudUrl="https://crudcrud.com/api/41f95ac9356441d0a651a68fcdbdeb90"
var products=document.getElementById("products-list");
var worth=document.querySelector(".worth");

getProducts();
getWorth();
function addProductHandler(event){
    event.preventDefault();
    let productName=document.getElementById("product-name").value;
    let price=document.getElementById("price").value;

    var newProductObject={
        productName:productName,
        price:price
    }
    axios.post(`${crudUrl}/products`,newProductObject)
    .then(()=>{ worth.innerText=parseInt(worth.innerText)+parseInt(newProductObject.price);
        return getProducts()})
    .catch(err=>console.log(err));
    
}
function getProducts(){
    axios.get(`${crudUrl}/products`)
    .then(res=>{
        var productsList=res.data;
        products.innerHTML="";
        productsList.forEach(element => {
            var newProduct=document.createElement("div");
            var deleteBtn=document.createElement("button");
            deleteBtn.appendChild(document.createTextNode("Delete"));
            deleteBtn.addEventListener("click",deleteProduct);

            function deleteProduct(){
                axios.delete(`${crudUrl}/products/${element._id}`)
                .then(()=>{
                    worth.innerText=parseInt(worth.innerText)-parseInt(element.price);
                    return products.removeChild(newProduct);
                })
                .catch(err=>console.log(err));
            }
            newProduct.appendChild(document.createTextNode(element.productName+" : Rs "+element.price));
            newProduct.appendChild(deleteBtn);
            products.appendChild(newProduct);

        });
    })
    .catch(err=>console.log(err));
}

function getWorth(){
    axios.get(`${crudUrl}/products`)
    .then(res=>{
        let productsList=res.data;
        let totalWorth=0;
        productsList.forEach((product)=>{
            totalWorth+=parseInt(product.price);
        });
        worth.appendChild(document.createTextNode(totalWorth));
    })
}