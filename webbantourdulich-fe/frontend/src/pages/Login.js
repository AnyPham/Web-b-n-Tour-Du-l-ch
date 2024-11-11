import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import "../styles/login.scss";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector} from "react-redux";

export const Login = () => {
    const [username, usernameupdate] = useState('');
    const [passwordS, passwordupdate] = useState('');
    const selectedTour = useSelector(state => state.selectedTour)
    const history = useNavigate();
    const hbsahdkb;
    //,mnsfnvsnfafsnvjasnvlsajn
    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const ProcceedLogin =(e)=> {
        e.preventDefault();
        if (validate()) {
            fetch(`http://localhost:5000/api/users?username=${username}`)
                .then((res)=> res.json())
                .then((resp) => {
                    const {id, username, password, fullname, email, phone, img} = resp[0]
                    if (password === passwordS) {
                        toast.success('Đăng nhập thành công');
                        localStorage.setItem("user", JSON.stringify({id, username, fullname, email, phone, img}));
                        sessionStorage.setItem('user', JSON.stringify({id, username, fullname, email, phone, img}));
                        selectedTour ? history('/cart'):history('/');
                        return
                    } else {
                        return toast.error('username hoặc mật khẩu không đúng');
                    }

            })
                .catch((err)=> {
                    return  toast.error('Đăng nhập không thành công');
            })
        }
    }

    const validate=() => {
        let result = true;
        if(username === null || username ==='') {
            result = false;
            return  toast.warn('Vui lòng nhập username');
        }
        if (passwordS === null || passwordS ==='') {
            result = false;
            return  toast.warn('Vui lòng nhập mật khẩu');
        }
        return result;
    }

    return (
        <>
            <title>Đăng nhập</title>
            <Navbar/>
            <div className="container2">
                <div className="wrapper">
                    <div className="title">Đăng nhập</div>
                    <Form className="formLogin" onSubmit={ProcceedLogin}>
                        <Form.Group className="inputValue" controlId="formBasicEmail">
                            <Form.Control value={username} onChange={e=>usernameupdate(e.target.value)} type="username" name='username' placeholder="username"/>
                        </Form.Group>
                        <Form.Group className="inputValue" controlId="formBasicEmail">
                            <Form.Control value={passwordS} onChange={e=>passwordupdate(e.target.value)} type="password" name='password' placeholder="Mật khẩu"/>
                        </Form.Group>
                        <Button variant="primary" className='buttonLogin' type="submit">
                            Đăng nhập
                        </Button>
                    </Form>
                    <div className="linktext">
                        <a href="/login" className="link">Quên mật khẩu</a>
                        <a href="/register" className="link">Tạo tài khoản mới</a>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        </>
    )
}

