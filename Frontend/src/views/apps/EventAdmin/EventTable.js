import React, { useState, useMemo } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';

const EventTable = ({ events }) => {
  const [filter, setFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);

  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Start Date',
      accessor: 'startDate',
    },
    {
      Header: 'End Date',
      accessor: 'endDate',
    },
    {
      Header: 'Location',
      accessor: 'location',
    },
    {
      Header: 'Attendees',
      accessor: 'attendees',
      Cell: ({ value }) => value.join(', '),
    },
    {
      Header: 'Participants',
      accessor: 'participants',
      Cell: ({ value }) => value.join(', '),
    },
    {
      Header: 'Image',
      accessor: 'image',
      Cell: ({ value }) => <img src={value} alt="event" />,
    },
    {
      Header: 'Reviews',
      accessor: 'reviews',
      Cell: ({ value }) => value?.length,
    },
    {
      Header: 'Favorites',
      accessor: 'favorites',
      Cell: ({ value }) => value?.length,
    },
  ], []);

  const handleFilterChange = (selectedOption) => {
    setFilter(selectedOption);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filteredEvents = useMemo(() => {
    if (!filter) {
      return events;
    }

    const filtered = events.filter((event) => {
      return event.name.toLowerCase().includes(filter.value.toLowerCase())
        || event.location.toLowerCase().includes(filter.value.toLowerCase());
    });

    return filtered;
  }, [events, filter]);

  const pageCount = useMemo(() => {
    return Math.ceil(filteredEvents?.length / perPage);
  }, [filteredEvents, perPage]);

  const pagedEvents = useMemo(() => {
    const start = currentPage * perPage;
    const end = start + perPage;

    return filteredEvents?.slice(start, end);
  }, [filteredEvents, currentPage, perPage]);

  return (
    <>
      <div className="filters">
        <Select
          value={filter}
          onChange={handleFilterChange}
          options={[
            { label: 'All', value: '' },
            { label: 'New York', value: 'New York' },
            { label: 'Los Angeles', value: 'Los Angeles' },
            { label: 'Chicago', value: 'Chicago' },
          ]}
        />
      </div>
      <ReactTable
        data={pagedEvents}
        columns={columns}
        defaultPageSize={perPage}
        className="-striped -highlight"
      />
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        previousLabel="<"
        nextLabel=">"
        previousClassName="pagination__prev"
        nextClassName="pagination__next"
        activeClassName="pagination__active"
        disabledClassName="pagination__disabled"
        />
        </>
        );
        };
        
        export default EventTable;