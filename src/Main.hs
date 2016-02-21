{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}
module Main (main) where

import System.Environment (getEnv, lookupEnv)
import Data.Text (Text)
import Control.Exception

import Web.Scotty

import Network.Wai.Middleware.RequestLogger
import Network.Wai.Middleware.Static

import Text.Blaze.Html.Renderer.Text (renderHtml)
import Text.Hamlet (hamlet, hamletFile)


data Route = Home | Stylesheet

getPort :: IO Int
getPort = (getEnv "PORT" >>= return . read) `catch`
    (\(SomeException _) -> return 3000)


render :: Route -> [(Text, Text)] -> Text
render Home _ = "/"
render Stylesheet _ = "/build/app.css"


title :: String
title = "LibreCash"

author :: String
author = "Yasuhiro Asaka"

footer = $(hamletFile "src/templates/_footer.hamlet")


main :: IO ()
main = do
    port <- getPort
    scotty port $ do
        middleware logStdoutDev
        middleware $ staticPolicy (noDots >-> addBase "static")

        get "/" $ do
            html $ renderHtml $ $(
              hamletFile "src/templates/index.hamlet") render
