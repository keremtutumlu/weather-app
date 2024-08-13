import { useEffect, useState } from 'react';
import './Select.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/ReactToastify.css';

export const Select = () => {

    const navigate = useNavigate();
    const [city, setCity] = useState('');
    const key = '3dd0c4f8feb9eccc627dd7cd6f9a6d59';
    const [coordinate, setCoordinate] = useState([]);

    const handleSearch = async (event) => {
        event.preventDefault();

        try {
            let query ='http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=1&appid='+key;
            const response = await fetch(query)
            const data = await response.json();
            setCoordinate(data);
        } catch (error) {
            console.error('Hata yakalandı : ', error);
        }

    }

    useEffect(() => {
        setTimeout(() => {
            if (coordinate.length > 0) {
                localStorage.setItem('lat', coordinate[0].lat);
                localStorage.setItem('lon', coordinate[0].lon);
                toast.success('Arama başarılı! Sonuca yönlendiriliyorsunuz...', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate('/show');
            } else {
                console.error('Hata!');
                toast.warn('Arama başarısız! Lütfen tekrar deneyiniz.', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }, 1000)
    }, [coordinate]);
    
    return (
        <form class="input-area" onSubmit={handleSearch}>
            <label class="input-label">Hava durumunu öğrenmek istediğiniz şehri yazınız...</label>
            <div class="input-group mb-3">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    class="form-control"
                    placeholder="Şehri giriniz..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
                <span class="input-group-text" id="basic-addon2"><button type="submit" class="btn btn-primary">Sorgula</button></span>
            </div>
        </form>
    )
}
