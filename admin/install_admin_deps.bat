@echo off
cd /d %~dp0
call npm install
cd ..
echo Admin dashboard dependencies installed successfully!