const permissions = {
  admin: ["create:any", "read:any", "update:any", "delete:any"],
  editor: [
    "create:artist",
    "create:album",
    "create:track",
    "read:any",
    "update:artist",
    "update:album",
    "update:track",
    "delete:artist",
    "delete:album",
    "delete:track",
  ],
  viewer: ["read:any", "read:favorite", "create:favorite", "delete:favorite"],
};

export default permissions;
