import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PaginationDiv = styled.div`
  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-family: Anjoman;
  }
  li {
    min-width: 2.1em;
    text-align: center;
    margin: 2px;
    padding: 0px 2px;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14.6px;
  }
  .paginationContainer {
    list-style-type: none;
  }
  .activePage {
    background-color: #ece2cb;
  }
  .tagliPage {
    list-style-type: none;
  }
  .tagLiEllipsis {
    list-style-type: none;
    /* border: 3px solid #0f0;s */
    width: 20px;
    color: #ff0;
  }
  .treeDot {
    min-width: 20px;
    max-width: 30px;
    list-style-type: none;
    color: #000;
  }
`;

export const ShamPaginate = (props) => {
  return (
    <PaginationDiv>
      <ReactPaginate
        className='paginationContainer'
        breakClassName='treeDot'
        activeClassName='activePage'
        breakLabel='...'
        previousLabel='→'
        onPageChange={(e) => props.goToPage(e.selected + 1)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={props.totalPages}
        nextLabel='←'
        renderOnZeroPageCount={null}
      />
    </PaginationDiv>
  );
};

const TableContainer = styled.div`
  width: 100%;
  font-size: 14px;
  button {
    padding: 2px 5px;
    font-size: 10px;
  }
  table {
    text-align: center;
    width: 100%;
    /* border-collapse: collapse; */
  }

  thead {
    td {
      background-color: #fff;
      font-size: 14px;
      /* border: 1px solid #888; */
      filter: drop-shadow(2mm 0mm 1mm rgb(29, 38, 109, 0.3));
      transition: all 0.33s;
      margin-bottom: 5px;
    }
    td:hover {
      filter: drop-shadow(0.5mm 0mm 0.3mm rgb(29, 38, 109, 0.3));
    }
  }
  tbody {
    td {
      /* z-index: 1; */
      border-radius: 3px;
    }
    td:hover {
      background-color: #eee;
    }
    tr {
      border: 1px solid #888;
      transition: all 0.33s;
      filter: drop-shadow(2mm 0mm 1.5mm rgb(29, 38, 109, 0.3));
    }
    tr:hover {
      filter: drop-shadow(0.5mm 0mm 0.5mm rgb(29, 38, 109, 0.4));
    }
    .unstripedRow {
      background-color: #f3ebdb;
    }

    .unstripedRow:hover {
      background-color: #e0e0e0;
    }
    .stripedRow {
      background-color: #f3f3f5;
    }

    .stripedRow:hover {
      background-color: #e0e0e0;
    }
  }
  td {
    padding: 2px;
  }

  .DesktopTable {
    display: block;
    @media screen and (max-width: 770px) {
      display: none;
    }
  }
  .MobileTable {
    display: none;

    h3 {
      width: 100%;
      margin: 5px 5px;
    }

    .mobileAccordionHeading {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      width: 100%;
      margin: 25px 10px 15px 0;
    }
    .eachMobileHeader {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      width: 100%;
    }

    .eachMobileRow {
      width: 100%;
      margin: 0;
      padding: 0;
      font-size: 12px;
      h3 {
        border-bottom: solid 2px #fad3cf;
      }
    }

    @media screen and (max-width: 770px) {
      display: block;
      button {
        padding: 5px 8px;
        font-size: 14.667px;
      }
      .editImg {
        width: 60px;
      }
    }
  }
`;

export const ResponsiveTable = ({ data, colDefs }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <TableContainer>
      <div className='DesktopTable'>
        <table>
          <thead>
            <tr>
              {colDefs.map((def, index) => (
                <td key={index}>{def.headerName}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={index % 2 !== 0 ? 'stripedRow' : 'unstripedRow'}
              >
                {colDefs.map((def, ind) => (
                  <td key={ind} style={def.cellStyle && def.cellStyle}>
                    {row[def.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='MobileTable'>
        <div style={{ width: '88%', margin: '5px auto' }}>
          <div>
            <div className='mobileAccordionHeading'>
              {colDefs.map(
                (def, ind) =>
                  def.mobileHeader && <h4 key={ind}>{def.headerName}: </h4>
              )}
              <div style={{ visibility: 'hidden' }}>........</div>
            </div>

            {data.map((row, index) => (
              <Accordion
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1bh-content'
                  id='panel1bh-header'
                >
                  <div className='eachMobileHeader'>
                    {colDefs.map(
                      (def, ind) =>
                        def.mobileHeader && (
                          <div key={ind} style={{ width: '100%' }}>
                            <h3 style={def.cellStyle && def.cellStyle}>
                              {row[def.field]}
                            </h3>
                          </div>
                        )
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '0' }}>
                  <div className='eachMobileRow'>
                    {colDefs.map(
                      (def, ind) =>
                        !def.mobileHeader && (
                          <span
                            key={ind}
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              width: '100%',
                              padding: 0,
                            }}
                          >
                            <h3 style={def.cellStyle && def.cellStyle}>
                              {def.headerName}: {row[def.field]}
                            </h3>
                          </span>
                        )
                    )}
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </TableContainer>
  );
};
