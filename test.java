getRecommendTeacherList@Component
public class ItemCF {

    private static class Pairs {
        int teacherId;
        int stars;
        Pairs(int teacherId, int stars) {
            this.teacherId = teacherId;
            this.stars = stars;
        }
    }

    CommentService commentService;
    UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setCommentService(CommentService commentService) {
        this.commentService = commentService;
    }

    public List<TeacherInf> getRecommendTeacherList(List<TeacherInf> teacherInfList,
                                                    int selfId) {
        // 获取用户对教师的评分, 建立相似矩阵, 计算相似度, 进行评分, 推荐排序
        // 进行判断，若用户数小于2，则不进行推荐，若当前用户无任何评分，则不进行推荐
        if (userService.list().size() < 2 ||
                commentService.list().isEmpty() ||
                commentService.findCommentList(selfId, "hot").isEmpty()) {
            return teacherInfList;
        }
        int teacherNum = teacherInfList.size();
        List<Comment> commentList = commentService.list();
        List<User> userList = userService.list();
        int userNum = userList.size();
        int[][] matrix = new int[userNum][teacherNum];
        // 建立相似度矩阵
        for (Comment comment : commentList) {
            Integer evaluatorId = comment.getEvaluatorId();
            Integer evaluateeId = comment.getEvaluateeId();
            Integer stars = comment.getStars();
            matrix[evaluatorId][evaluateeId] = stars;
        }
        // 计算相似度， 定义评分大于三为喜欢
        double[][] similarityMatrix = new double[teacherNum][teacherNum];

        for (int i = 0; i < teacherNum; i++) {
            for (int j = 0; j < teacherNum; j++) {
                // 计算喜欢i, j的用户数
                int likeI = 0;
                int likeJ = 0;
                int likeBoth = 0;
                for (int k = 0; k < userNum; k++) {
                    if (matrix[k][i] > 3) {
                        likeI++;
                    }
                    if (matrix[k][j] > 3) {
                        likeJ++;
                    }
                    if (matrix[k][i] > 3 && matrix[k][j] > 3) {
                        likeBoth++;
                    }
                }
                // 计算相似度
                double similarity = Math.abs(likeBoth) / Math.sqrt(likeI * likeJ);
                similarityMatrix[i][j] = similarity;
            }
        }

        // 建立推荐度向量
        double[] recommend = new double[teacherNum];

        // 获取用户已经评分的教师及评分
        // TeacherId, Stars
        Vector<Pairs> ratedTeacher = new Vector<>();
        for (int i = 0; i < teacherNum; i++) {
            if (matrix[selfId][i] != 0) {
                ratedTeacher.add(new Pairs(i, matrix[selfId][i]));
            }
        }

        for (int i = 0; i < teacherNum; i++) {
            // 优先推荐未评分的教师
            if (matrix[selfId][i] != 0) {
                recommend[i] = 0;
                continue;
            }

            // 计算推荐度
            double recommendScore = 0;
            for (Pairs pairs : ratedTeacher) {
                int teacherId = pairs.teacherId;
                int stars = pairs.stars;
                recommendScore += similarityMatrix[i][teacherId] * stars;
            }
            recommend[i] = recommendScore;
        }

        // 根据推荐度向量修改排序列表
        teacherInfList.sort((o1, o2) -> {
            int index1 = teacherInfList.indexOf(o1);
            int index2 = teacherInfList.indexOf(o2);
            return Double.compare(recommend[index2], recommend[index1]);
        });

        // 返回修改后的推荐列表
        return teacherInfList;
    }
}
