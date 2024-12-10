"use client";
import { useGetCategorySeveralQuery } from "@/redux/api/category";
import scss from "./SearchContent.module.scss";
import { useRouter } from "next/navigation";

const SearchContent = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGetCategorySeveralQuery();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error loading categories</p>;
  }
  const itemCategory = data?.categories.items;

  return (
    <section>
      <div className={scss.SearchContent}>
        <div className="container">
          <div className={scss.content}>
            <div className={scss.category}>
              {itemCategory?.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: `url(${item.icons[0].url})`,
                    width: "clamp(130px, 20vw, 240px)",
                    height: "clamp(80px, 15vw, 130px)",
                    cursor: "pointer",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    fontSize: "clamp(12px, 2vw, 20px)",
                    paddingTop: "clamp(50px, 10vw, 90px)",
                    paddingLeft: "clamp(8px, 10vw, 20px)",
                  }}
                  className={scss.categotyImg}
                >
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchContent;
