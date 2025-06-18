import React, { useState } from 'react'
import type { IResult } from '../interface/mv.type'
import { Button, Card, Col, Rate, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';
import MovieModal from './MovieModal';

interface Props {
    item: IResult | null;
}

const MovieCard: React.FC<Props> = ({item}) => {
    const navigate = useNavigate();
    const [showMovie, setShowMovie] = useState<{
        isOpen: boolean;
        data: IResult | null;
    }>({
        isOpen: false,
        data: null,
    });

  return (
    <>
        <Col xs={24} sm={24} md={8} lg={6} onClick={()=>setShowMovie({isOpen: true, data: item || null})}>
            <Card
                className='!w-full'
                cover={
                <img
                    alt="cover"
                    className='!h-44'
                    src={`${import.meta.env.VITE_COVER_PREVIEW}/${item?.backdrop_path || item?.poster_path || ""}`}
                />
                }
                actions={[
                <Rate allowHalf disabled value={Math.round(item?.vote_average || 2)} defaultValue={2} count={5}/>,
                <Button type='text' variant='outlined' className='!text-sky-600'>Read more</Button>
                ]}
            >
                <Meta
                    title={item?.title || ""}
                    description={<Typography className='line-clamp-2'>{item?.overview || ""}</Typography>}
                />
            </Card>
        </Col>
        <MovieModal isOpen={showMovie.isOpen} data={showMovie?.data} onClose={()=>setShowMovie({isOpen: false, data: null})}/>
    </>
  )
}

export default MovieCard