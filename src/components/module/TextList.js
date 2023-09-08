import styles from "@/module/TextList.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineLibraryAdd } from "react-icons/md";

const TextList = ({ title, profileData, setProfileData, type }) => {
  const changeHandler = (e, index) => {
    const { value } = e.target;
    const list = [...profileData[type]];
    list[index] = value;
    setProfileData((prev) => ({ ...prev, [type]: list }));
  };
  const addHandler = () => {
    setProfileData((prev) => ({ ...prev, [type]: [...prev[type], ""] }));
  };
  const deleteHandler = (index) => {
    profileData[type].splice(index, 1);
    setProfileData((prev) => ({ ...prev }));
  };
  return (
    <div className={styles.container}>
      <p>{title}</p>
      {profileData[type].map((i, index) => (
        <div className={styles.card} key={index}>
          <input type="text" value={i} onChange={(e) => changeHandler(e, index)} />
          <button onClick={() => deleteHandler(index)}>
            حذف
            <AiOutlineDelete />
          </button>
        </div>
      ))}
      <button onClick={addHandler}>
        افزودن
        <MdOutlineLibraryAdd />
      </button>
    </div>
  );
};

export default TextList;
