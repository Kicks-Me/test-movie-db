import { Button, Card, Col, Empty, Flex, Image, notification, Pagination, Rate, Row, Select, Skeleton, Space, Spin, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import type { IMovie, IResult } from '../interface/mv.type';
import Meta from 'antd/es/card/Meta';
import { Content } from 'antd/es/layout/layout';
import MovieCard from '../components/Movie.Card';
import { FaListUl } from 'react-icons/fa';

type Props = {};

const MovieView: React.FC = (props: Props) => {
  const [mvData, setMvData] = useState<IMovie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [bg, setBg] = useState("")
  const [genres, setGenres] = useState(28)

  const getMovie = async (page: number = 1) => {
    const url = import.meta.env.VITE_API_END_POINT;

    try {
      setLoading(true);
      const result = await axios.get(`${url}&with_genres=${genres}`); 
      setMvData(result?.data || null);
    } catch (error) {
      setMvData(null);
      notification.error({
        message: 'Error',
        description: 'Failed to fetch movie data.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovie(currentPage);
  }, [currentPage]);

  const paginatedResults = mvData?.results?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  ) || [];

  const totalItems = mvData?.results?.length || 0;

  const handlePageChange = (page: number, newPageSize: number) => {
    setCurrentPage(page);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
      setCurrentPage(1);
    }
  };

  const onChange = (value: number) => {
    console.log(`selected ${value}`);
    setGenres(value)
  };

useEffect(() => {
  if (paginatedResults.length > 0) {
    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * paginatedResults.length);
      const item = paginatedResults[randomIndex];
      setBg(`${import.meta.env.VITE_COVER_PREVIEW}/${item?.backdrop_path}`);
    }, 1000);

    return () => clearTimeout(timer); 
  }
}, [paginatedResults]);

useEffect(()=>{
    if(genres){
        getMovie();
    }
}, [genres]);

  return (
    <Content>
      <Content
        className="!min-h-80 !h-80 !max-h-80 !w-full bg-cover bg-center opacity-85 shadow-lg"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />
      <Flex justify="space-between" align="center" className="!px-5 md:!px-10 lg:!px-20 !py-10">
        <Typography.Title level={2}>Movie List</Typography.Title>
        <Space className="cursor-pointer">
          Filter:
          <Select onChange={onChange} className='!w-44 !ml-2'>
                <Select.Option value="28">TV movie</Select.Option>
                <Select.Option value="36">Sicient Fiction</Select.Option>
                <Select.Option value="10402">MV History</Select.Option>
                <Select.Option value="878">MV Action</Select.Option>
                <Select.Option value="10770">Music</Select.Option>
            </Select>
        </Space>
      </Flex>
      <Skeleton loading={loading} className="!border">
        <Row gutter={[24, 24]} className="!p-5 md:!p-10 lg:!p-20">
          {paginatedResults.length > 0 ? (
            paginatedResults.map((item: IResult, index: number) => (
              <MovieCard item={item} key={item?.id || index} />
            ))
          ) : (
            <Empty />
          )}
        </Row>
        {totalItems > 0 && (
          <Flex justify="center" className="!my-7">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItems}
              onChange={handlePageChange}
              showSizeChanger
              pageSizeOptions={['10', '20', '50']}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} movies`}
            />
          </Flex>
        )}
      </Skeleton>
    </Content>
  );
};

export default MovieView;