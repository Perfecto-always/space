# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
  ];
  # Sets environment variables in the workspace
  env = {};

  # Enable previews and customize configuration
  idx.previews = {
  enable = true;
  previews = [
    # The following object sets web previews
    {
      command = [
        "npm"
        "run"
        "dev"
      ];
      id = "web";
      manager = "web";
    }
  ];
};
}