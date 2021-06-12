#include <iostream>
#include <iomanip>
using namespace std;
int qcal(long long n, long long k, double q){
    double comq[5050][5050]; //com[n][k]=nCk
    double powq[5050]; //qの累乗
    int p = 1000000007; //nCk modPのP  1000000007=10^9+7
    comq[0][0]  = 1;
    powq[0] = 1;
    for (int i = 1; i <= k; i++){
        powq[i] = powq[i-1] * q;
    }
    for (int i = 1; i <= n;i++){
        comq[i][0] = 1;
        for (int j = 1; j <= k; j++){
            comq[i][j] = (double)(comq[i-1][j-1] + powq[j] * comq[i-1][j]);
        }
    }
    return comq[n][k];
}
int main(){
    double result;
    result = qcal(25,5,2);
    cout <<  fixed << setprecision(15) << result << endl;
}