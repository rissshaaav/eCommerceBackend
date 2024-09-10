alias userLogin='curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"testuser1\", \"password\":\"testuser1\"}" -o res.json http://localhost:3000/user/login'

alias adminLogin='curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"testuser\", \"password\":\"testuser\"}" -o res.json http://localhost:3000/user/login'

addProduct() {
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $1" -d @req.json -o res.json http://localhost:3000/product/new
}

addToCart(){
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $1" -d @req.json -o res.json http://localhost:3000/cart/add
}

getCart(){
    curl -X GET -H "Authorization: Bearer $1" -o res.json http://localhost:3000/cart
}

updateCart(){
    curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer $1" -d @req.json -o res.json http://localhost:3000/cart/update
}