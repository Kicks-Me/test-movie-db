import { Button, Card, Col, Empty, Flex, Image, notification, Rate, Row, Space, Spin, Typography } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import type { IMovie, IResult } from '../interface/mv.type';
import Meta from 'antd/es/card/Meta';
import { Content } from 'antd/es/layout/layout';
import MovieCard from '../components/Movie.Card';
import { FaListUl } from 'react-icons/fa';

type Props = {}

const MovieView: React.FC = (props: Props) => {
    const [mvData, setMvData] = useState<IMovie | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
   

    const getMovie = async () => {
        const url = import.meta.env.VITE_API_END_POINT;

        try {
            setLoading(true);

            const result = await axios.get(url);

            setMvData(result?.data || null);

        } catch (error) {
            setMvData(null);
        }
        finally{
            setLoading(false);
        }
    }


    useEffect(()=>{
        getMovie();
    }, []);

  return (
    <Content>
        <Content
            className="!min-h-80 !h-80 !max-h-80 !w-full bg-cover bg-center opacity-85 shadow-lg"
            style={{
                backgroundImage: `url(https://kometa.wiki/en/latest/assets/images/defaults/overlays/content_rating_de.png)`,
            }}
        />
        <Flex justify='space-between' align='center' className='!px-5 md:!px-10 lg:!px-20 !py-10'>
            <Typography.Title level={2}>
                Movie List
            </Typography.Title>
            <Space className='cursor-pointer'><FaListUl size={22}/></Space>
        </Flex>
        <Spin size="large" spinning={loading} tip="ກຳລັງໂຫລດຂໍ້ມູນ..." className='!border'>
            <Row gutter={[24,24]} className='!p-5 md:!p-10 lg:!p-20'>
            {
                mvData && mvData?.results?.length > 0 ?
                mvData.results.map((item: IResult, index: number) => {

                    return (
                        <MovieCard item={item} key={item?.id || index}/>
                    )
                })
                :
                <Empty/>
            }
            </Row>
        </Spin>
        
    </Content>
  )
}

export default MovieView

