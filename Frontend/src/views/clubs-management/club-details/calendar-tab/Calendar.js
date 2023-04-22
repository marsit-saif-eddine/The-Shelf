// ** React Import
import { useEffect, useRef, memo, Fragment } from 'react'

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// ** Third Party Components
import toast from 'react-hot-toast'
import { Menu } from 'react-feather'
import { Card, CardBody } from 'reactstrap'
import { useSelector } from 'react-redux'

const Calendar = props => {
  // ** Refs
  const calendarRef = useRef(null)

  // ** Props
  const {
    store,
    isRtl,
    dispatch,
    calendarsColor,
    calendarApi,
    setCalendarApi,
    handleAddEventSidebar,
    blankEvent,
    toggleSidebar,
    selectEvent,
    updateEvent
  } = props

  const events = useSelector(state => state.clubs.events?.map(x => {
    return {
      title: x.name,
      start: x.startDate,
      allDay: true,
    }
  }));

  useEffect(() => {
  }, [])

  // ** calendarOptions(Props)
  const calendarOptions = {
    events: events.length ? events : [],
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },

    editable: false,

    eventResizableFromStart: false,

    dragScroll: false,

    dayMaxEvents: 3,

    navLinks: true,

    eventClassNames() {
      return 'bg-light-warning'
    },

    eventClick({ event: clickedEvent }) {
      dispatch(selectEvent(clickedEvent))
      handleAddEventSidebar()

      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      // event.value = grabEventDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      // isAddNewEventSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        text: <Menu className='d-xl-none d-block' />,
        click() {
          toggleSidebar(true)
        }
      }
    },

    dateClick(info) {
      const ev = blankEvent
      ev.start = info.date
      ev.end = info.date
      dispatch(selectEvent(ev))
      handleAddEventSidebar()
    },

    ref: calendarRef,

  }

  return (
    <Card className='shadow-none border-0 mb-0 rounded-0'>
      <CardBody className='pb-0'>
        <FullCalendar {...calendarOptions} />{' '}
      </CardBody>
    </Card>
  )
}

export default memo(Calendar)
