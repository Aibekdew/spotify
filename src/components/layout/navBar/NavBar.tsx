import Link from "next/link";
import scss from "./NavBar.module.scss";
import { GoHome } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";
import { useRouter } from "next/navigation";
const NavBar = () => {
  const router = useRouter();
  return (
    <div className={scss.NavBar}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.menu}>
            <Link href={"/"} className={scss.home}>
              <GoHome />
            </Link>
            <h4>Главная</h4>
          </div>
          <div
            onClick={() => {
              router.push("/search");
            }}
            className={scss.search}
          >
            <a className={scss.sear}>{<FiSearch />}</a>
            <h4>Поиск</h4>
          </div>
          <div className={scss.playlist}>
            <Link className={scss.playImg} href={"/media"}>
              <BiLibrary />
            </Link>
            <h4>Моя медиатека</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
