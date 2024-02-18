import React from 'react'
import { Avatar, List, Skeleton, Button } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleLeft, faMapMarked } from '@fortawesome/free-solid-svg-icons';
import { fetchAllPath, selectVehiclePaths } from '../redux/pathSlice';
import { useDispatch, useSelector } from 'react-redux';

const History = () => {

    const dispatch = useDispatch();
    const vehiclePaths = useSelector(selectVehiclePaths);
    const { vehicleId } = useParams();

    const uniqueDates = [...new Set(vehiclePaths.map(item => item.created_at.split(' ')[0]))];
    // Format dates into the desired format
    const dateList = uniqueDates.map(date => {
        const [year, month, day] = date.split('-');
        const formattedDate = new Date(`${year}-${month}-${day}`).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });

        // Count occurrences of the current date in vehiclePaths
        const waypointCount = vehiclePaths.filter(item => item.created_at.split(' ')[0] === date).length;

        return {
            link: date,
            label: formattedDate,
            counts: waypointCount,
        };
    }).sort((a, b) => new Date(b.link) - new Date(a.link));

    // console.log(dateList);
    // console.log('vehicle ID:', vehicleId);

    return (
        <>
            <Link to={'/'}> <Button className=' bg-gray-900 text-white mt-3 mb-5'><FontAwesomeIcon icon={faAngleLeft} className='mr-2' /> Back </Button></Link>

            <List
                size="small"
                header={<div className=' font-bold text-lg'>RSH 222 XS</div>}
                itemLayout="horizontal"
                bordered={true}
                dataSource={dateList}

                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Link to={`/vehicle/${vehicleId}/${item.link}`}><Button size='small' className=' bg-gray-600 text-white'> <FontAwesomeIcon icon={faMapMarked} className='mr-2' /> Routes </Button></Link>,
                            // <a key="list-loadmore-more"> Estimated Fuel </a>
                        ]}
                    >
                        <List.Item.Meta
                            title={item.label}
                        // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div>Waypoints: {item.counts} </div>
                    </List.Item>
                )}
            />

        </>
    )
}

export default History