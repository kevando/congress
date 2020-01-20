import React, { useState, useEffect } from "react";
import { Icon, Table, Rating, Header, Image } from "semantic-ui-react";
import _ from "lodash";

import "./styles.scss";

const API_URL = "http://localhost:8080/api/v1/";
const dataUrl = API_URL + "senators?limit=100";

const Debug = () => {
  const [senators, setSenators] = useState([]);

  useEffect(() => {
    fetch(dataUrl)
      .then(res => res.json())
      .then(
        result => {
          console.log("result", result);
          setSenators(result);
        },
        error => {
          console.log(error);
        }
      );
  }, [setSenators]);

  return (
    <div className="debug table">
      <Table celled padded compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>Name</Table.HeaderCell>
            <Table.HeaderCell width={1}>Colors</Table.HeaderCell>
            <Table.HeaderCell width={7}>Description</Table.HeaderCell>
            <Table.HeaderCell width={7}>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {senators.map(({ name, twitterLocation, twitterColors, twitterDescription, status }) => {
            return (
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>
                      {name}
                      <Header.Subheader>{twitterLocation}</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell className="color-pallete">
                  <div>
                  {_.map(twitterColors, (rgb) => (
                    <div style={{backgroundColor: `#${rgb}`}}>
                    </div>
                  ))}
                  </div>
                </Table.Cell>


                <Table.Cell>
                  {twitterDescription}
                </Table.Cell>
                <Table.Cell>
                  {status && status.text}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Debug;
