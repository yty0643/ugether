import React from "react";
import UserMenu from "../user_menu/user_menu";
import styles from "./header.module.css";
import Logo from "../logo/logo";
import Search from "../search/search";
import UserBtns from "../user_btns/user_btns";
import PartnerMenu from "../partner_menu/partner_menu";

const Header = ({
  user,
  partner,
  user_menu,
  partner_menu,
  xActive,
  setUser_menu,
  setPartner_menu,
  signOut,
  kakaoMsg,
  search,
  searchActiveHandle,
  goHome,
}) => {
  return (
    <header className={styles.header}>
      <Logo goHome={goHome} />
      <Search
        xActive={xActive}
        search={search}
        searchActiveHandle={searchActiveHandle}
      />
      <UserBtns
        user={user}
        partner={partner}
        setUser_menu={setUser_menu}
        setPartner_menu={setPartner_menu}
      />
      {user_menu && <UserMenu user={user} signOut={signOut} />}
      {partner_menu && (
        <PartnerMenu user={user} partner={partner} kakaoMsg={kakaoMsg} />
      )}
    </header>
  );
};

export default Header;
