import api from "../../lib/apiConfig"

export function calibration(){
        const getCalibration = async (id_user) => {
            try {
                const res = await api.get(`calibration/${id_user}`);
                return res.data
            } catch (error) {
                console.log("Gagal Mengambil Data")
            }
        }

        const setCalibration = async (data) => {
            try {
                const res = await api.post('calibration/',data)
                console.log("Post Success ", res.data)
    
            }
            catch (err){
                console.error('Post error', err)
            }
        }

        const updateCalibration = async (id,data, setError) => {
            try {
                const res = await api.patch(`calibration/${id}`,data)
                console.log("Update Success ", res.data)
    
            }
            catch (err){
                console.error('put error', err)
            }
        }
    
        return {
            getCalibration,
            setCalibration,
            updateCalibration
        }
}