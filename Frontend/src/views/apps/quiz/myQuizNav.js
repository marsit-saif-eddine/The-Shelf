import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, CardText, CardTitle,CardImg, Col, Row, DropdownMenu, DropdownItem } from "reactstrap";
import QuizDisplayy from "./quizDisplay";
import img from "@src/assets/images/icons/quiz.jpg"
import { Link } from 'react-router-dom';
import { Trash2 , Bookmark, Award} from "react-feather";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import quizCreate from "./quizCreate";
import Swal from 'sweetalert2';
import axios from "axios";
import { useParams } from 'react-router-dom';
import QuizAchievments from "./quizAchievements";



const myQuizNav = () => {
    const [active, setActive] = useState("1");
    const [scrollAtTop, setScrollAtTop] = useState(false);
    useEffect(() => {
      window.addEventListener("scroll", () => {
        if (window.scrollY >= 285) {
          setScrollAtTop(true);
        } else {
          setScrollAtTop(false);
        }
      });
    }, []);
  
    const toggleTab = (tab) => {
      if (active !== tab) {
        setActive(tab);
      }
    };
  
    return (
    <>
        <Nav pills className='nav-justified mb-2'>
          <NavItem>
            <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
              <Bookmark className="font-medium-3 me-50" />
              <span className="fw-bold">My Quizzes</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
              <Award className="font-medium-3 me-50" />
              <span className="fw-bold">My achivments</span>
            </NavLink>
          </NavItem>
      
       
        </Nav>
        <TabContent activeTab={active}>
          <TabPane tabId="1">
            <QuizDisplayy/>
          </TabPane>
          <TabPane tabId="2">
            <QuizAchievments/>
          </TabPane>
         
      
        </TabContent>
      </>
    );
  };
  export default myQuizNav;