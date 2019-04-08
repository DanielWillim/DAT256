{ pkgs ? import <nixpkgs> {}, nodejs ? pkgs.nodejs-10_x }:

let
  inherit (pkgs)
    stdenv
  ;

in stdenv.mkDerivation {
  name = "node-dev-env";
  buildInputs = with pkgs; [
    nodejs
    flow
#    libelf
  ];
  shellHook = ''
    flow_bin=$(dirname $(which flow))
    export PATH="$flow_bin:$PWD/node_modules/.bin/:$PATH"
  '';
}
