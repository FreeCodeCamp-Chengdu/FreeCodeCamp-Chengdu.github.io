#! /usr/bin/env bash

SourceOwner=$1
SourceName=$2
TargetOwner=$3
TargetName=$4

sed -i "s/$SourceOwner\/$SourceName/$TargetOwner\/$TargetName/ig" \
    $(grep -i $SourceOwner/$SourceName -rl . --exclude-dir=.git --exclude-dir=node_modules)
sed -i "s/$SourceOwner/$TargetOwner/ig" \
    $(grep -i $SourceOwner -rl . --exclude-dir=.git --exclude-dir=node_modules)
sed -i "s/$SourceName/$TargetName/ig" \
    $(grep -i $SourceName -rl . --exclude-dir=.git --exclude-dir=node_modules)
