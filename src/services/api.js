const BASE = 'https://fakestoreapi.com'
async function request(path){
    const res = await fetch(BASE + path)
    if (!res.ok) throw new Error('Failed: '+res.status)
        return res.json()
}
export default request