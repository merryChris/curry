#/usr/bin/sh

cat /dev/null > info
root_dir="/home/zacky/Projects/Curry"
file_types=("*.rb" "*.yml" "*.sql" "*.json_builder" "*.erb" "*.css" "*.scss" "*.js" "*.html")
sum=0

echo "==========CODE LINES CALCULATOR========="

for i in ${file_types[@]}
do
  find ${root_dir} -iname $i > info
  sed -i 's/ /\\&/g' info
  cat info | xargs wc -l > tmp
  cnt=`sed -n '$p' tmp | grep -o '[0-9]\+'`
  if [ -z "${cnt}" ]; then
    cnt=0
  fi
  let sum=sum+cnt
  printf "%-15sfiles: %d\n" ${i} ${cnt}
done

echo "total: ${sum}"
echo "========================================"

rm -rf tmp info
