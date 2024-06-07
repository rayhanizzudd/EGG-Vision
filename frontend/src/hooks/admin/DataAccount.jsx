import api from "../../lib/apiConfig"

export function dataAcccount(){
        const fetchData = async () => {
            try {
                const res = await api.get('getallusers');
                return res.data
            } catch (error) {
                console.log("Gagal Mengambil Data")
            }
        }

        const postData = async (dataUsers) => {
            try {
                const res = await api.post('users',dataUsers)
                console.log("Post Success ", res.data)
    
            }
            catch (err){
                console.error('Post error', err)
            }
        }
    
        const putData = async (dataUsers, id_Users) => {
            try {
                const res = await api.patch(`users/${id_Users}`, dataUsers)
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        
        const deleteData = async (id_Users) => {
            try {
                const res = await api.delete(`getallusers/${id_Users}`)
                console.log("Delete success", res.data);
    
            }
            catch (err){
                console.error('Delete error', err)
            }
        }
    
        return {
            fetchData,
            postData,
            putData,
            deleteData
        }
}