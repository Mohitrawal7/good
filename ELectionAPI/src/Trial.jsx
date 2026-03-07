import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Flex, Space,Progress, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;


// const data = [
//   {
//     key: '1',
//     firstName: 'John',
//     lastName: 'Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     firstName: 'Jim',
//     lastName: 'Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     firstName: 'Joe',
//     lastName: 'Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];



const Trial = () => {

const [parties, setParties] = useState([]);
  const [totalSeats, setTotalSeats] = useState(0);


useEffect(() => {

  const fetchData = async () => {
      const response = await axios.get(
        "https://election.onlinekhabar.com/wp-json/okelapi/v1/2082/home/election-results?limit=10"
      );

      console.log(response.data.data.party_results);
      const partyResults = response.data.data.party_results;

       // Calculate total seats
     const total = partyResults.reduce((sum, party) => sum + party.total_seat, 0);
      setTotalSeats(total);



      const formatted = partyResults.map((party) => ({
        id: party.party_id,
        image:party.party_image,
        name: party.party_name,
        color: party.party_color,
        leading_count: party.leading_count,
        winner_count: party.winner_count,
        samunapatik: party.samanupatik,
        seats: party.total_seat, // 🔑 seat data
        // percentage:((party.total_seat / totalSeats) * 100).toFixed(1), // % of total
      }));

      setParties(formatted);
    };

    fetchData();
  
}, []);



  return (

    <>
    <div>
      <h1 className="text-4xl px-4 lg:px-60">ELection Result live </h1>

{/* Table */}
<Table dataSource={parties} title={() => (
  <div className='flex gap-4 items-center'>
  <p> Election 2082</p>
  <button className="bg-red-600 rounded-lg  px-8 py-1">LIVE</button>
<Tag color="grey" className="ml-auto right-8">
 Used from OnlineKhabar
  </Tag>
</div>

)} 
  onRow={(record) => ({
    style: { backgroundColor: record.color }, // assuming `color` is a field in your data
  })}


pagination={false}  bordered>
    
  <Column
  title="Party Name"
  dataIndex="name"
  key="name"
  render={(text, record) => {
   const percentage = totalSeats>0 ?  ((record.seats / totalSeats) * 100).toFixed(1) : 0;
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ minWidth: 80 }}>{text}</span>
          <Progress
            percent={percentage}
            showInfo={false}
            strokeColor={record.color || "#1890ff"}
            style={{ marginLeft: 10, flex: 1 }}
          />
        </div>
      );
   }
  }
    />
    
      <Column title="Lead" dataIndex="leading_count" key="lastName" />
      <Column title="WIN" dataIndex="winner_count" key="age" />
    <Column title="Total Seats" dataIndex="seats" key="address" />
    <Column title="Samanupatik Seats" dataIndex="samunapatik" key="address" />
    {/* <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={tags => (
        <Flex gap="small" align="center" wrap>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </Flex>
      )}
    />  */}
   
  </Table>

    </div>
    </>

)
}

export default Trial