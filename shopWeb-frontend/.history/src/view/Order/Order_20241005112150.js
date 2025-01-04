import React, { useState,useEffect } from "react";
import './userPage.css';
import { logout } from "../../Service/UserService";
import { resetUser, updateUser } from "../../Redux/sliders/userSlide"; // Đảm bảo import đúng hàm updateUser
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Order from '../Order/Order'

function Order({ setIsSignIn }) {
    
    return (
      <div></div>
    );
}

export default Order;
