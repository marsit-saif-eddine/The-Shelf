import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import {
  User,
  Lock,
  Bookmark,
  Bell,
  Link,
  Users,
  Award,
  Mail,
  Calendar,
} from "react-feather";
import AnnouncementsTab from "./announcements-tab/AnnouncementsTab";
import MembersTab from "./members-tab/MembersTab";
import EventsTab from "./events-tab/EventsTab";
import CalendarTab from "./calendar-tab";
import AppChat from "../chat";

const NavTabs = () => {
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
            <span className="fw-bold">Announcements</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Users className="font-medium-3 me-50" />
            <span className="fw-bold">Members</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <Award className="font-medium-3 me-50" />
            <span className="fw-bold">Events</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <Calendar className="font-medium-3 me-50" />
            <span className="fw-bold">Calendar</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "5"} onClick={() => toggleTab("5")}>
            <Mail className="font-medium-3 me-50" />
            <span className="fw-bold">Live chat</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <AnnouncementsTab/>
        </TabPane>
        <TabPane tabId="2">
          <MembersTab/>
        </TabPane>
        <TabPane tabId="3">
          <EventsTab/>
        </TabPane>
        <TabPane tabId="4">
          <CalendarTab/>
        </TabPane>
        <TabPane tabId="5">
          <AppChat/>
        </TabPane>
      </TabContent>
    </>
  );
};

export default NavTabs;
