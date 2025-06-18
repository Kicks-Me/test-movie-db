import React, { useState } from 'react'
import type { IResult } from '../interface/mv.type'
import { Flex, Modal, Typography } from 'antd';
import type { YouTubeProps } from 'react-youtube';
import YouTube from 'react-youtube';
import { Content } from 'antd/es/layout/layout';
import movieTrailer from 'movie-trailer'

interface Props {
    isOpen: boolean;
    onClose: ()=>void;
    data: IResult | null;
}

const MovieDetail: React.FC<Props> = ({isOpen, onClose, data}) => {

  const [TrailerURL, setTrailerURL] = useState<string>("");
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.pauseVideo();
    }

    const opts = {
        height: '300',
        width: '500',
        playerVars: {
            autoplay: 1,
        },
    };

    movieTrailer(data?.original_title || "")
    .then((url: string) => {
        const urlParam = new URLSearchParams(new URL(url).search);
        setTrailerURL(urlParam.get("v") || "");
    })
    .catch((error: unknown) => console.log(error));

  return (
    <Modal
        open={isOpen}
        width={'50%'}
        onCancel={onClose}
        footer={null}
    >

        <Flex vertical justify='space-between !py-5 !mb-10'>
            <Content>
            <Typography.Title level={3}>
            {data?.title}
            </Typography.Title>
        </Content>
        <Content className='!mt-7'>
            <YouTube videoId={TrailerURL} opts={opts} onReady={onPlayerReady} className='!rounded-md !w-full'/>
        </Content>
        </Flex>
        <div style={{height: 80}}/>
        <Typography.Text className='!mt-20'>
            {data?.overview}
        </Typography.Text>
    </Modal>
  )
}
export default MovieDetail;