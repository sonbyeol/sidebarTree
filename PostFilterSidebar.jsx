import React, { useEffect, useState } from 'react';
import { SavedQueriesList, FilterLiveSearch, FilterList, FilterListItem } from 'react-admin';
import { Grid, Card, CardContent } from '@mui/material';
import MailIcon from '@mui/icons-material/MailOutline';
import CategoryIcon from '@mui/icons-material/LocalOffer';
import axios from 'axios';

import { AddAdapterButton } from './AddAdapterButton';
import { AddInterfaceButton } from './AddInterfaceButton';
// 아이콘 매핑 객체
const iconMap = {
    MailIcon: <MailIcon />,
    CategoryIcon: <CategoryIcon />
};

const fetchFilterData = async () => {
    const response = await axios.get('http://localhost:8080/trees');
    return response.data;
};


export const PostFilterSidebar = () => {
    const [filterData, setFilterData] = useState([]);

    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/trees');
                setFilterData(response.data);
            } catch (error) {
                console.error('필터 데이터를 가져오는 중 오류 발생:', error);
            }
        };

        fetchFilterData(); // 컴포넌트가 마운트될 때 한 번 데이터를 가져오도록 설정

        // setInterval을 사용하여 일정 시간마다 데이터를 다시 가져오도록 설정
        const interval = setInterval(() => {
            fetchFilterData();
        }, 5000); // 1분마다 데이터를 다시 가져오도록 설정

        return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 interval 정리
    }, []);

    return (
        <Card sx={{ order: -1, mr: 2, mt: 9, width: 200 }}>
        <CardContent>
            <AddAdapterButton />
            {filterData.map((filter, index) => (
                <Grid container alignItems="center" key={index} spacing={1}>
                    <Grid item>
                        <FilterList 
                            label={filter.label} 
                            icon={iconMap[filter.icon]} 
                        />
                    </Grid>
                    <Grid item>
                        <AddInterfaceButton />
                    </Grid>
                    {filter.items.map((item, itemIndex) => (
                        <Grid item key={itemIndex}>
                            <FilterListItem
                                label={item.label}
                                value={item.value}
                            />
                        </Grid>
                    ))}
                </Grid>
            ))}
        </CardContent>
    </Card>
    );
};
