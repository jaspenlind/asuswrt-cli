#!/bin/bash
Is_Help() {
    grep -qE '^-h'
}

Is_Log() {
    grep -qE 'firewall log'
}

Is_Date() {
    read -r d
    date -j -f "%Y-%m-%d" "$d" >/dev/null 2>&1
}

To_LogDate() {
    read -r d
    date -j -f "%Y-%m-%d" "$d" +%b\ %e
}

Todays_LogDate() {
    date +%b\ %e
}
