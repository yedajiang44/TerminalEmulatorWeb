#!/bin/sh

npx ng build --prod
docker build --pull --rm --no-cache -f "Dockerfile" -t yedajiang44/jt808terminalemulator-ui "."
while true; do
    stty -icanon min 0 time 100
    printf "是否推送镜像(yes or no)?"
    read -r Arg
    case $Arg in
    Y | y | YES | yes)
        break
        ;;
    N | n | NO | no)
        exit
        ;;
    "") #Autocontinue
        break ;;
    esac
done

while true; do
    stty -icanon min 0 time 100
    printf "输入镜像tag："
    read -r tag
    case $tag in
    "") ;;
    *)
        break
        ;;

    esac
done

echo '准备镜像...'
docker tag yedajiang44/jt808terminalemulator-ui yedajiang44/jt808terminalemulator-ui:"$tag"
docker tag yedajiang44/jt808terminalemulator-ui registry.cn-hangzhou.aliyuncs.com/yedajiang44/jt808terminalemulator-ui
docker tag yedajiang44/jt808terminalemulator-ui registry.cn-hangzhou.aliyuncs.com/yedajiang44/jt808terminalemulator-ui:"$tag"
echo '准备完毕...'
echo '准备推送镜像...'
echo '推送至docker hub...'
docker push yedajiang44/jt808terminalemulator-ui:"$tag"
docker push yedajiang44/jt808terminalemulator-ui
echo '推送镜像完毕...'

echo '推送至阿里云...'
docker push registry.cn-hangzhou.aliyuncs.com/yedajiang44/jt808terminalemulator-ui:"$tag"
docker push registry.cn-hangzhou.aliyuncs.com/yedajiang44/jt808terminalemulator-ui
echo '推送镜像完毕...'
exit
