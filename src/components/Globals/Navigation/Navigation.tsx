import Link from "next/link";
import { print } from "graphql/language/printer";

import styles from "./Navigation.module.css";

import { MenuItem, RootQueryToMenuItemConnection } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { Header } from "@/stories/header/Header";
import gql from "graphql-tag";

async function getData() {
  const menuQuery = gql`
    query MenuQuery {
      menuItems(where: { location: HEADER }) {
        nodes {
          uri
          target
          label
        }
      }
    }
  `;

  const { menuItems } = await fetchGraphQL<{
    menuItems: RootQueryToMenuItemConnection;
  }>(print(menuQuery));

  if (menuItems === null) {
    throw new Error("Failed to fetch data");
  }

  return menuItems;
}

export default async function Navigation() {
  const menuItems = await getData();

  return (
      <Header menuItems={menuItems.nodes as MenuItem[]} />
  );
}
