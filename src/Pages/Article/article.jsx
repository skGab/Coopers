import "./article.scss";
import "swiper/css/bundle";
import Card from "./Card/card";
import CardsData from "../../Data/CardsData.json";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const Article = () => {
  return (
    <article className="article__container">
      {/* Title */}
      <h2>good things</h2>

      {/* Cards */}
      <div className="article__cardContainer">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          breakpoints={{
            560: {
              slidesPerView: 1,
              spaceBetween: 500
            },
            732: {
              slidesPerView: 2,
              spaceBetween: 150
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 200
            },
          }}
        >
          {CardsData.map((item) => (
            <SwiperSlide key={item.id}>
              <Card item={item} key={item.id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </article>
  );
};

export default Article;
