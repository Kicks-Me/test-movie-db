import React, { useState } from 'react'
import type { IResult } from '../interface/mv.type'
import { Modal, Typography } from 'antd';
import type { YouTubeProps } from 'react-youtube';
import YouTube from 'react-youtube';
import { Content } from 'antd/es/layout/layout';
import movieTrailer from 'movie-trailer'
import { CloseOutlined } from '@ant-design/icons';

interface Props {
    isOpen: boolean;
    onClose: ()=>void;
    data: IResult | null;
}

const MovieModal: React.FC<Props> = ({isOpen, onClose, data}) => {

  const [TrailerURL, setTrailerURL] = useState<string>("");
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.pauseVideo();
    }

    const opts = {
        height: '600',
        width: '1000',
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
        width={1050}
        onCancel={onClose}
        footer={null}
        styles={{
            content: { background: 'transparent', boxShadow: 'none' }, 
        }}
        closeIcon={
            <span
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.6)', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}
            >
                <CloseOutlined style={{ color: '#fff', fontSize: 16 }} />
            </span>
        }
    >
        <Content className='!mt-2'>
            <YouTube videoId={TrailerURL} opts={opts} onReady={onPlayerReady} className='!rounded-md !w-full'/>
        </Content>
    </Modal>
  )
}
export default MovieModal;