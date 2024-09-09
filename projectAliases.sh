alias start='npm start'

api(){
    "curl -X POST -H 'Content-Type: application/json' -H 'Authentication: Bearer $1' -d @req.json -o res.json http://localhost:3000/$2"
}