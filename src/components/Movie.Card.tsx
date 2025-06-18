import React, { useState } from 'react'
import type { IResult } from '../interface/mv.type'
import { Button, Card, Col, Rate, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';
import MovieModal from './MovieModal';
import MovieDetail from './ModalDetail';

interface Props {
    item: IResult | null;
}

const MovieCard: React.FC<Props> = ({item}) => {
    const navigate = useNavigate();
    const [showMovie, setShowMovie] = useState<{
        isOpen: boolean;
        data: IResult | null;
        type: 'play' | 'view' | 'none'
    }>({
        isOpen: false,
        data: null,
        type: 'none'
    });

  return (
    <>
        <Col xs={24} sm={24} md={8} lg={6} onClick={()=>setShowMovie({isOpen: true, data: item || null, type: 'play'})}>
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
                <Button type='text' variant='outlined' onClick={(e)=>{
                    e.stopPropagation();
                    setShowMovie({
                        isOpen: true,
                        data: item,
                        type: 'view'
                    });
                }} className='!text-sky-600'>Read more</Button>
                ]}
            >
                <Meta
                    title={item?.title || ""}
                    description={<Typography className='line-clamp-2'>{item?.overview || ""}</Typography>}
                />
            </Card>
        </Col>
        <MovieDetail  isOpen={showMovie.isOpen && showMovie.type === 'view'} data={showMovie?.data} onClose={()=>setShowMovie({isOpen: false, data: null, type:'none'})}/>
        <MovieModal isOpen={showMovie.isOpen && showMovie.type === 'play'} data={showMovie?.data} onClose={()=>setShowMovie({isOpen: false, data: null, type:'none'})}/>
    </>
  )
}

export default MovieCard